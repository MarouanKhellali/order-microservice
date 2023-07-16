const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const customer = new Customer({ name, email });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, email } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      { name, email },
      { new: true }
    );
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
