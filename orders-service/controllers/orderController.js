const Order = require('../models/orderModel');

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  try {
    const { customer, product, quantity } = req.body;
    const order = new Order({ customer, product, quantity });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une commande par ID
exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une commande
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { customer, product, quantity } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { customer, product, quantity },
      { new: true }
    );
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
