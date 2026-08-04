import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async (category) => {
  const res = await API.get('/products', { params: category ? { category } : {} });
  return res.data;
};

export const getProduct = async (slug) => {
  const res = await API.get(`/products/${slug}`);
  return res.data;
};

export const placeOrder = async (orderData) => {
  const res = await API.post('/orders', orderData);
  return res.data;
};

// --- Admin functions (in sab ko admin key chahiye) ---

export const createProduct = async (productData, adminKey) => {
  const res = await API.post('/products', productData, {
    headers: { 'x-admin-key': adminKey },
  });
  return res.data;
};

export const getOrders = async (adminKey) => {
  const res = await API.get('/orders', {
    headers: { 'x-admin-key': adminKey },
  });
  return res.data;
};

export const updateOrderStatus = async (orderId, status, adminKey) => {
  const res = await API.patch(
    `/orders/${orderId}/status`,
    { status },
    { headers: { 'x-admin-key': adminKey } }
  );
  return res.data;
};

export const uploadImage = async (file, adminKey) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await API.post('/upload', formData, {
    headers: {
      'x-admin-key': adminKey,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.url;
};

export const deleteProduct = async (productId, adminKey) => {
  const res = await API.delete(`/products/${productId}`, {
    headers: { 'x-admin-key': adminKey },
  });
  return res.data;
};

export const updateProduct = async (productId, productData, adminKey) => {
  const res = await API.put(`/products/${productId}`, productData, {
    headers: { 'x-admin-key': adminKey },
  });
  return res.data;
};

export const trackOrder = async (orderId) => {
  const res = await API.get(`/orders/track/${orderId}`);
  return res.data;
};