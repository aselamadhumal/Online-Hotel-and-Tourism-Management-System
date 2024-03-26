const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        unique: true,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});

const Staff = mongoose.model('Staff', StaffSchema);
module.exports = Staff;
