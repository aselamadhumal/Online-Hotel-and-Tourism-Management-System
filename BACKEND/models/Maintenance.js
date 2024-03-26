const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  costOfLost: {
    type: Number,
    required: true,
  },
  costToReplace: {
    type: Number,
    required: true,
  },
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
