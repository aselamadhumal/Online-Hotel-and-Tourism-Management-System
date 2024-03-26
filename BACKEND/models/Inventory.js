const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
