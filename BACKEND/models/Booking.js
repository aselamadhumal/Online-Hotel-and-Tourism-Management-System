const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    packageId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
