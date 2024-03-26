const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance.js'); // Import your Maintenance model

// Get all maintenance records
router.get('/', async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find();
    res.json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new maintenance record
router.post('/add', async (req, res) => {
  const { category, subCategory, item, quantity, costOfLost, costToReplace } = req.body;
  
  const newMaintenanceRecord = new Maintenance({
    category,
    subCategory,
    item,
    quantity,
    costOfLost,
    costToReplace
  });

  try {
    const savedMaintenanceRecord = await newMaintenanceRecord.save();
    res.json(savedMaintenanceRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a maintenance record by ID
router.put('/update/:id', async (req, res) => {
  const { category, subCategory, item, quantity, costOfLost, costToReplace } = req.body;
  const maintenanceRecordId = req.params.id;

  try {
    const updatedMaintenanceRecord = await Maintenance.findByIdAndUpdate(maintenanceRecordId, {
      category,
      subCategory,
      item,
      quantity,
      costOfLost,
      costToReplace
    });
    res.json(updatedMaintenanceRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a maintenance record by ID
router.delete('/delete/:id', async (req, res) => {
  const maintenanceRecordId = req.params.id;

  try {
    await Maintenance.findByIdAndDelete(maintenanceRecordId);
    res.json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a maintenance record by ID
router.get('/get/:id', async (req, res) => {
  try {
    const maintenanceRecordId = req.params.id;
    const maintenanceRecord = await Maintenance.findById(maintenanceRecordId);
    if (!maintenanceRecord) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.json(maintenanceRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
