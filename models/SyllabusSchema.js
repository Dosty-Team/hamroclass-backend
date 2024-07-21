const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    chapterName: {
        type: String,
        required: true
    },
    hoursRequired: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);
