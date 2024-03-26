const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
});

const Finance = mongoose.model('Finance', FinanceSchema);
module.exports = Finance;
