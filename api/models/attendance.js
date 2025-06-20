const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        enum: ['Present', 'Absent', 'Half Day', 'Holiday'],
        type: String,
        required: true
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;