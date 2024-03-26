const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory'); // Import the Inventory model

router.post('/add', async (req, res) => {
    try {
        const { name, category, quantity, price, description, manufacturer, expiryDate } = req.body;
        const newInventoryItem = new Inventory({ name, category, quantity, price, description, manufacturer, expiryDate });
        await newInventoryItem.save();
        res.json({ status: 'Inventory item added successfully', inventoryItem: newInventoryItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.json(inventoryItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { name, category, quantity, price, description, manufacturer, expiryDate } = req.body;
        const updatedInventoryItem = await Inventory.findByIdAndUpdate(itemId, 
            { name, category, quantity, price, description, manufacturer, expiryDate },
            { new: true }
        );
        if (!updatedInventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ status: 'Inventory item updated', inventoryItem: updatedInventoryItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid inventory item ID' });
        }
        const deletedInventoryItem = await Inventory.findByIdAndRemove(itemId);
        if (!deletedInventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ status: 'Inventory item deleted', inventoryItem: deletedInventoryItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const inventoryItem = await Inventory.findById(itemId);
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(inventoryItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
