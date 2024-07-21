const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notificationfordate : {
        type:String,
        default:false
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
