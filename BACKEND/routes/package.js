const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Create a new package
router.post('/add', async (req, res) => {
    try {
        const { name, description, price, duration, amenities } = req.body;
        const newPackage = new Package({ name, description, price, duration, amenities });
        await newPackage.save();
        res.json({ status: 'Package added successfully', package: newPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all packages
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const packageId = req.params.id;
        const { name, description, price, duration, amenities } = req.body;
        const updatedPackage = await Package.findByIdAndUpdate(packageId,
            { name, description, price, duration, amenities },
            { new: true }
        );
        if (!updatedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.json({ status: 'Package updated', package: updatedPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const packageId = req.params.id;
        if (!packageId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid package ID' });
        }
        const deletedPackage = await Package.findByIdAndRemove(packageId);
        if (!deletedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.json({ status: 'Package deleted', package: deletedPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const packageId = req.params.id;
        const package = await Package.findById(packageId);
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
