import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { STORE_NAME } from "../../constants";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";

export default function ProductList() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(""); // FIXED: Variable synchronization mapping
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");

  const { data: categories = [] } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "File upload execution failure.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !countInStock || !brand || !image) {
      return toast.error("All production fields are mandatory.");
    }

    try {
      await createProduct({
        name,
        description,
        price: Number(price),
        category,
        countInStock: Number(countInStock), // FIXED: Aligned parameter forward map properties
        brand,
        image,
      }).unwrap();

      toast.success("Product successfully created!");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || "Product allocation rejected.");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50/60 px-4 sm:px-6 lg:px-8 py-8 text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-xs">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{STORE_NAME} Product Forge</h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Initialize stock tracking, attributes, and file parameters.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/50 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Product Visual Asset</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition cursor-pointer relative">
              <input type="file" accept="image/*" onChange={uploadFileHandler} className="absolute inset-0 opacity-0 cursor-pointer" />
              <p className="text-xs font-bold text-slate-600">{isUploading ? "Uploading..." : image ? `Asset Attached: ${image}` : "Drag image or click to select storage path"}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Title Identification</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm border border-slate-200 bg-slate-50/50 p-3 rounded-xl outline-hidden focus:border-slate-400" placeholder="Product name" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Brand Label</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full text-sm border border-slate-200 bg-slate-50/50 p-3 rounded-xl outline-hidden focus:border-slate-400" placeholder="Brand origin" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Base Cost (USD)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full text-sm border border-slate-200 bg-slate-50/50 p-3 rounded-xl outline-hidden focus:border-slate-400" placeholder="0.00" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Inventory Quantity</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full text-sm border border-slate-200 bg-slate-50/50 p-3 rounded-xl outline-hidden focus:border-slate-400" placeholder="Units available" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Category Context</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-sm border border-slate-200 bg-slate-50/50 p-3 rounded-xl outline-hidden focus:border-slate-400 cursor-pointer">
                <option value="">Select Category node</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Structural Information / Specs</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full text-sm border border-slate-200 bg-slate-50/50 p-3 rounded-xl outline-hidden focus:border-slate-400 resize-none" placeholder="Enter specifications details..."></textarea>
          </div>

          <button type="submit" disabled={isCreating} className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wide transition shadow-2xs active:scale-[0.99] disabled:opacity-50">
            {isCreating ? "Writing to Registry..." : "Deploy Active Listing"}
          </button>
        </form>
      </div>
    </section>
  );
}