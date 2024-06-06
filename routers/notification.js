const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications', error });
    }
});

// Add a new notification
router.post('/notifications', async (req, res) => {
    try {
        console.log('notificaiton route is working here.')
        const { message , notificationfordate} = req.body;
        console.log(notificationfordate)
        console.log('date ko type',typeof notificationfordate)
        


        const newNotification = new Notification({ message, notificationfordate });
        await newNotification.save();

        res.status(201).json({ message: 'Notification added successfully' });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ message: 'Failed to add notification', error });
    }
});

// Delete a notification
router.delete('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await Notification.findByIdAndDelete(id);

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Failed to delete notification', error });
    }
});

module.exports = router;
