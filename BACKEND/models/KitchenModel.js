const mongoose = require('mongoose');

const kitchenSchema = new mongoose.Schema({
  name: {
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
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'prepared'],
    default: 'pending',
  },
  prepare: {
    type: String,
    enum: ['pending', 'prepared'],
    default: 'pending',
  },
  price: {
    type: Number,
    default: 1000,
  },
});

const Kitchen = mongoose.model('Kitchen', kitchenSchema);

module.exports = Kitchen;
