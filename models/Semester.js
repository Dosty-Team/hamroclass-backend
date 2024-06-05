const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    faculty: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;
