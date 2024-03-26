const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true,
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
