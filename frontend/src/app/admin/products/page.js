'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { getProducts, createProduct, updateProduct, uploadImage, deleteProduct } from '@/lib/api';

export default function AdminProductsPage() { 
  const categoryOptions = ['Wall Decor', 'Table Decor', 'Storage', 'Lighting', 'Rugs', 'Textiles'];
  const tagOptions = ['', 'New', 'Bestseller', 'Trending'];
  const { adminKey, isLoggedIn } = useAdmin();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: '',
    slug: '',
    description: '',
    price: '',
    salePrice: '',
    imageUrl: '',
    category: '',
    stock: '',
    tag: '',
    careInstructions: '',
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }
    loadProducts();
  }, [isLoggedIn]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Could not load products.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm({ ...form, name, slug: generateSlug(name) });
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice || '',
      imageUrl: product.images[0],
      category: product.category,
      stock: product.stock,
      tag: product.tag || '',
      careInstructions: product.careInstructions || '',
    });
    setImagePreview(product.images[0]);
    setImageFile(null);
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Photo is required only when adding a new product; editing can keep the existing photo
    if (!editingId && !imageFile) {
      setError('Please select a product photo.');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile, adminKey);
        setUploading(false);
      }

      const productData = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        images: [imageUrl],
      };

      if (form.salePrice) productData.salePrice = Number(form.salePrice);
      if (form.tag) productData.tag = form.tag;
      if (form.careInstructions) productData.careInstructions = form.careInstructions;

      if (editingId) {
        await updateProduct(editingId, productData, adminKey);
        setSuccess('Product updated successfully!');
      } else {
        await createProduct(productData, adminKey);
        setSuccess('Product added successfully!');
      }

      cancelEdit();
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product. Check your admin key.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (!confirm(`Delete "${productName}"? This cannot be undone.`)) return;

    try {
      await deleteProduct(productId, adminKey);
      if (editingId === productId) cancelEdit();
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product.');
    }
  };

  if (!isLoggedIn) return null;

  return (
    <main className="max-w-6xl mx-auto px-8 py-14">
      <h1 className="font-display text-3xl mb-10">Manage Products</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Add/Edit Product Form */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="text-xs text-inksoft border border-black/10 px-3 py-1.5 rounded"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-bgalt rounded p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Product Name</label>
              <input
                required
                value={form.name}
                onChange={handleNameChange}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Slug (auto-generated)</label>
              <input
                required
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Description</label>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white min-h-[70px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Price ($)</label>
                <input
                  required
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Sale Price (optional)</label>
                <input
                  type="number"
                  name="salePrice"
                  value={form.salePrice}
                  onChange={handleChange}
                  className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">
                Product Photo {editingId && "(leave empty to keep current photo)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded mt-2.5" />
              )}
              {uploading && <p className="text-xs text-inksoft mt-1.5">Uploading photo...</p>}
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Category</label>
                <select
                  required
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Stock</label>
                <input
                  required
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Tag (optional)</label>
              <select
                name="tag"
                value={form.tag}
                onChange={handleChange}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              >
                <option value="">No tag</option>
                <option value="New">New</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Trending">Trending</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Care Instructions (optional)</label>
              <textarea
                name="careInstructions"
                value={form.careInstructions}
                onChange={handleChange}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white min-h-[60px]"
              />
            </div>

            {error && <p className="text-rosedeep text-sm">{error}</p>}
            {success && <p className="text-sage text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-white py-3 rounded font-medium disabled:opacity-50"
            >
              {loading
                ? (editingId ? 'Updating...' : 'Adding...')
                : (editingId ? 'Update Product' : 'Add Product')}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div>
          <h2 className="font-display text-xl mb-5">Existing Products ({products.length})</h2>
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p._id}
                className={`flex gap-4 items-center rounded p-3.5 ${editingId === p._id ? 'bg-sage/10 border border-sage' : 'bg-bgalt'}`}
              >
                <div className="w-14 h-14 bg-[#EDEBE6] rounded overflow-hidden flex-shrink-0">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-inksoft">
                    ${p.salePrice || p.price} · Stock: {p.stock} · {p.category}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-xs text-sage border border-sage/30 px-2.5 py-1.5 rounded hover:bg-sage hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id, p.name)}
                    className="text-xs text-rosedeep border border-rosedeep/30 px-2.5 py-1.5 rounded hover:bg-rosedeep hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}