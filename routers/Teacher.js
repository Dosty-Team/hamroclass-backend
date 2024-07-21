const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Semester = require('../models/Semester');

// GET semesters
router.get('/getsemesters', async (req, res) => {
    try {
        const semesters = await Semester.find();
        res.status(200).json(semesters);
    } catch (error) {
        console.error('Error fetching semesters:', error);
        res.status(500).json({ message: 'Failed to fetch semesters', error });
    }
});

// POST add teacher
router.post('/addteacher', async (req, res) => {
    try {
        const { subject, teacherName, days, semester } = req.body;

        // Delete existing records for the teacherName and semester
        await Teacher.deleteMany({ teacherName, semester });

        // Create new teacher document
        const newTeacher = new Teacher({ subject, teacherName, days, semester });

        // Save to the database
        await newTeacher.save();

        res.status(201).json({ message: 'Teacher added successfully' });
    } catch (error) {
        console.error('Error adding teacher:', error);
        res.status(500).json({ message: 'Failed to add teacher', error });
    }
});


// GET all teachers
router.get('/getteachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Failed to fetch teachers', error });
    }
});

module.exports = router;
