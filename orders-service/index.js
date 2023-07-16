const express = require('express');
const mongoose = require('mongoose');
const orderController = require('./controllers/orderController');

const app = express();
app.use(express.json());

// Connectez-vous à la base de données MongoDB
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1/orders-db";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Définir les points de terminaison API pour les commandes
app.get('/orders', orderController.getAllOrders);
app.post('/orders', orderController.createOrder);
app.get('/orders/:orderId', orderController.getOrder);
app.put('/orders/:orderId', orderController.updateOrder);
app.delete('/orders/:orderId', orderController.deleteOrder);

// Démarrer le serveur Express
app.listen(3001, () => {
  console.log('Orders Service is running on port 3001');
});
