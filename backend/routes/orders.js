const requireAdmin = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders — naya order place karo
router.post('/', async (req, res) => {
  const { items, customerName, phone, address, city, postalCode, deliveryNotes } = req.body;

  try {
    // Har item ka stock kam karo — agar kisi ka stock kam na ho, order fail ho jayega
    for (const item of items) {
      const updated = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } }
      );
      if (!updated) {
        throw new Error(`Not enough stock for ${item.name}`);
      }
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingFee = subtotal >= 3500 ? 0 : 200;

    const order = new Order({
      customerName, phone, address, city, postalCode, deliveryNotes,
      items, subtotal, shippingFee, total: subtotal + shippingFee
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders — saare orders dikhao (admin panel ke liye)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/status — order ka status update karo (Pending → Shipped waghera)
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders/track/:id — customer apna order status khud dekh sake (koi admin key nahi chahiye)
router.get('/track/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found. Please check your Order ID.' });

    res.json({
      status: order.status,
      items: order.items,
      total: order.total,
      customerName: order.customerName,
      createdAt: order.createdAt,
    });
  } catch (err) {
    res.status(400).json({ message: 'Invalid Order ID.' });
  }
});

module.exports = router;