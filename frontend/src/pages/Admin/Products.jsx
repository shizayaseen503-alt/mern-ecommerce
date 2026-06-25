import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { STORE_NAME } from "../../constants";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/api/productApiSlice";

export default function Products() {
  const PAGE_SIZE = 100;
  const { data, isLoading, isError, error } = useGetProductsQuery({ pageNumber: 1, pageSize: PAGE_SIZE });
  const [deleteProduct] = useDeleteProductMutation();
  const [search, setSearch] = useState("");

  const products = Array.isArray(data?.products) ? data.products : [];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) =>
      `${product.name || ""} ${product.brand || ""}`.toLowerCase().includes(query)
    );
  }, [products, search]);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-slate-50/60 px-4 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-bold text-slate-500">
          Loading product inventory...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-slate-50/60 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center text-sm font-bold text-rose-600">
          {error?.data?.message || "Failed to load products."}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50/60 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Inventory</p>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">{STORE_NAME} Products</h1>
          </div>
          <Link to="/admin/product/create" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600">
            + Add Product
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product or brand name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">Product</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">Brand</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">Price</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">Stock</th>
                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm font-semibold text-slate-400">No products found</td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.category?.name || "Uncategorized"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{product.brand || "-"}</td>
                      <td className="px-4 py-3 text-sm font-bold text-slate-900">${product.price?.toFixed(2) || "0.00"}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{product.countInStock ?? 0}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <Link to={`/admin/product/edit/${product._id}`} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Edit</Link>
                          <button onClick={() => deleteHandler(product._id)} className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
