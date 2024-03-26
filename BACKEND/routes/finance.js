const express = require('express');
const router = express.Router();
const Finance = require('../models/finance.js'); 

// Get all finance entries
router.get('/', async (req, res) => {
  try {
    const entries = await Finance.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Add a new finance entry
router.post('/add', async (req, res) => {
  const { category, amount, type } = req.body;

  const newEntry = new Finance({
    category,
    amount,
    type
  });

  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a finance entry by ID
router.put('/update/:id', async (req, res) => {
  const { category, amount, type } = req.body;
  const entryId = req.params.id;

  try {
    const updatedEntry = await Finance.findByIdAndUpdate(entryId, {
      category,
      amount,
      type
    });
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a finance entry by ID
router.delete('/delete/:id', async (req, res) => {
  const entryId = req.params.id;

  try {
    await Finance.findByIdAndDelete(entryId);
    res.json({ message: 'Finance entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/get/:id', async (req, res) => {
    try {
        const entryId = req.params.id;
        const entry = await Finance.findById(entryId);
        if (!entry) {
            return res.status(404).json({ error: 'Finance entry not found' });
        }
        res.json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/fetched', async (req, res) => {
  try {
      const { room, kitchen, staff, maintenance, inventory } = req.body;
      const categories = {
          room: 'income',
          kitchen: 'income',
          staff: 'expense',
          maintenance: 'expense',
          inventory: 'expense'
      };

      for (const category in categories) {
          const amount = req.body[category]; // Get the amount from the request body
          let financeEntry = await Finance.findOne({ category });

          if (!financeEntry) {
              financeEntry = new Finance({
                  category,
                  amount,
                  type: categories[category]
              });
          } else {
              financeEntry.amount = amount;
              financeEntry.type = categories[category];
          }

          await financeEntry.save();
      }

      res.json({ message: 'Finance updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
