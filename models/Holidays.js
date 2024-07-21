const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
    end: {
        type: Date,
        required: true
    },
    faculty: {
         type:String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
   
    title: {
        type: String,
        required: true
    },
    isEndOfSemester: {
        type: Boolean,
        default: false
    },
    
    isAbsentTeacher: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Holiday', HolidaySchema);
