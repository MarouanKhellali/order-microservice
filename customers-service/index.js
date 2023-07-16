const express = require('express');
const mongoose = require('mongoose');
const customerController = require('./controllers/customerController');

const app = express();
app.use(express.json());

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1/orders-db";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/customers', customerController.getAllCustomers);
app.post('/customers', customerController.createCustomer);
app.get('/customers/:customerId', customerController.getCustomer);
app.put('/customers/:customerId', customerController.updateCustomer);
app.delete('/customers/:customerId', customerController.deleteCustomer);

app.listen(3002, () => {
  console.log('Customers Service is running on port 3002');
});
