const express = require('express');
const router = express.Router();
const Kitchen = require('../models/KitchenModel'); // Import your Kitchen model

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Kitchen.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new order
router.post('/add', async (req, res) => {
  const { name, item, quantity, status, prepare } = req.body;
  console.log(name)
  const newOrder = new Kitchen({
    name,
    item,
    quantity,
    status,
    prepare
  });

  try {
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an order by ID
router.put('/update/:id', async (req, res) => {
  const { name, item, quantity, status, prepare } = req.body;
  const orderId = req.params.id;

  try {
    const updatedOrder = await Kitchen.findByIdAndUpdate(orderId, {
      name,
      item,
      quantity,
      status,
      prepare
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order by ID
router.delete('/delete/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    await Kitchen.findByIdAndDelete(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/get/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Kitchen.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Room reservation not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
