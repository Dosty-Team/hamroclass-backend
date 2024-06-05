const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester');

// Route to add a new semester
router.post('/addsemester', async (req, res) => {
    try {
        // Extract data from the request body
        const { faculty, startDate, endDate } = req.body;

        // Create a new semester document
        const semester = new Semester({
            faculty,
            startDate,
            endDate
        });

        // Save the semester document to the database
        const newSemester = await semester.save();

        // Respond with the newly created semester
        res.status(201).json(newSemester);
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error adding semester:', error);
        res.status(500).json({ message: 'Failed to add semester' });
    }
});
router.get('/getsemesters', async (req, res) => {
    try {
        // Retrieve all semester documents from the database
        const semesters = await Semester.find();

        // Transform the data
        const formattedSemesters = semesters.map(semester => ({
            id: semester._id,
            faculty: semester.faculty,
            startDate: semester.startDate.toISOString().split('T')[0], // Convert to string and remove time
            endDate: semester.endDate.toISOString().split('T')[0]     // Convert to string and remove time
        }));
        console.log(formattedSemesters)

        // Respond with the transformed semesters
        res.status(200).json(formattedSemesters);
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error fetching semesters:', error);
        res.status(500).json({ message: 'Failed to fetch semesters' });
    }
});

module.exports = router;
