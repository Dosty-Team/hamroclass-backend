const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    days: {
        type: [String],  // Array of days
        required: true
    },
    semester: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Teacher', TeacherSchema);
