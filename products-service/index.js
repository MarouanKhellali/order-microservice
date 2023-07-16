const express = require('express');
const mongoose = require('mongoose');
const productController = require('./controllers/productController');

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

app.get('/products', productController.getAllProducts);
app.post('/products', productController.createProduct);
app.get('/products/:productId', productController.getProduct);
app.put('/products/:productId', productController.updateProduct);
app.delete('/products/:productId', productController.deleteProduct);

app.listen(3000, () => {
  console.log('Products Service is running on port 3000');
});
