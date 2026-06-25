import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc Create new complex order record
// @route POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    shippingPrice, 
    totalPrice 
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("Your cart contains no items.");
  }

  // Guard rails against unauthorized execution paths
  if (!req.user) {
    res.status(401);
    throw new Error("User identity footprint missing from state context.");
  }

  try {
    // Deduct stock using safe atomic queries
    for (const item of orderItems) {
      // SAFELY CHECK BOTH FRONTEND ID VARIATIONS
      const productId = item.product || item._id;

      if (!productId) {
        res.status(400);
        throw new Error("A target item node is missing structural identification attributes.");
      }

      // Fetch product to check current stock
      const product = await Product.findById(productId);
      
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${productId}`);
      }
      
      if (product.countInStock < Number(item.qty)) {
        res.status(400);
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${product.countInStock}, Requested: ${item.qty}`
        );
      }

      // Updated option syntax removes the Mongoose deprecation warning
      const updatedProd = await Product.findOneAndUpdate(
        { _id: productId, countInStock: { $gte: Number(item.qty) } },
        { $inc: { countInStock: -Number(item.qty) } },
        { returnDocument: "after" } 
      );

      if (!updatedProd) {
        res.status(400);
        throw new Error(`Failed to reserve stock for ${product.name}. Please try again.`);
      }
    }

    // Build order document matching the schema definitions safely
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item.product || item._id, // Enforce key alignment matching schemas
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
});

// @desc Get logged-in user order records
// @route GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product", "name price image")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc Get order profile metrics by ID
// @route GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid order id.");
  }

  const order = await Order.findById(id)
    .populate("user", "username email")
    .populate("orderItems.product", "name price image");
    
  if (!order) {
    res.status(404);
    throw new Error("Requested order matrix node not found.");
  }
  res.json(order);
});

// @desc Process transaction payment status confirmation
// @route PUT /api/orders/:id/pay
const payOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid order id.");
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order trace mapping missing.");
  }

  order.isPaid = true;
  order.paidAt = new Date();
  
  // Clean structure matching flattened payload from frontend mutation updates
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status || "COMPLETED",
    update_time: new Date().toISOString(),
    referenceNotes: req.body.referenceNotes,
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc Admin: View system orders index
// @route GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "username email")
    .populate("orderItems.product", "name price image")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export { addOrderItems, getMyOrders, getOrderById, getOrders, payOrder };