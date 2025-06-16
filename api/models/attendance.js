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
        type: String,
        enum: ['Present', 'Absent', 'Leave'],
        required: true
    }
});
const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;