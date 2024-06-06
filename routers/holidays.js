const express = require('express');
const router = express.Router();
const Holiday = require('../models/Holidays');

// Route to add holidays
router.post('/holidaysadd', async (req, res) => {
    try {
        const holidays = req.body;
        const faculty = holidays.length > 0 ? holidays[0].faculty : null;

        if (faculty) {
            await Holiday.deleteMany({ faculty });

            const endOfSemesterFlag = holidays.find(holiday => holiday.isEndOfSemester);
            console.log("emmitted from here00")
            if (endOfSemesterFlag) {
                console.log("emmitted from here1")
                const savedHolidays = await Holiday.insertMany(holidays);
                console.log("emmitted from here2")
                savedHolidays.forEach(holiday => {
                    if (holiday.isEndOfSemester) {
                        global.io.emit('notification', {
                            message: `${holiday.title} is absent.`,
                            notificationfordate: holiday.start.toISOString().split('T')[0],
                            holiday
                        });
                        console.log(holiday)
                    }
                });
                const currentDate = new Date();
                const endOfSemesterDate = new Date(endOfSemesterFlag.end);
                const differenceInTime = endOfSemesterDate - currentDate;
                const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
                
                console.log(`Days until end of semester: ${differenceInDays}`);
                
                res.status(201).json(savedHolidays);
            } else {
                res.status(400).json({ message: 'End of semester flag not provided' });
            }
        } else {
            res.status(400).json({ message: 'Faculty not provided' });
        }
    } catch (error) {
        console.error('Error adding holidays:', error);
        res.status(500).json({ message: 'Failed to add holidays', error });
    }
});
// Route to get all holidays
router.get('/getcalender/:faculty', async (req, res) => {
    try {
        const { faculty } = req.params;
        const holidays = await Holiday.find({ faculty });
        res.status(200).json(holidays);
    } catch (error) {
        console.error('Error fetching holidays:', error);
        res.status(500).json({ message: 'Failed to fetch holidays', error });
    }
});
module.exports = router;
