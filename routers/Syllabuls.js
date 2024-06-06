const express = require('express');
const router = express.Router();
const Syllabus = require('../models/SyllabusSchema');

// POST: Add or update syllabus for a specific subject
router.post('/syllabus/:subject', async (req, res) => {
    try {
        const { subject } = req.params;
        const syllabusData = req.body;
        console.log(subject);

        // Delete existing records for the subject
        await Syllabus.deleteMany({ subject:subject.toString() });

        // Save new syllabus data to the database
        await Syllabus.insertMany(syllabusData);

        res.status(201).json({ message: 'Syllabus saved successfully' });
    } catch (error) {
        console.error('Error saving syllabus:', error);
        res.status(500).json({ message: 'Failed to save syllabus', error });
    }
});

// GET: Retrieve syllabus for a specific subject
router.get('/syllabus/:subject', async (req, res) => {
    try {
        const { subject } = req.params;
        const syllabus = await Syllabus.find({ subject });

        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        res.status(200).json(syllabus);
    } catch (error) {
        console.error('Error fetching syllabus:', error);
        res.status(500).json({ message: 'Failed to fetch syllabus', error });
    }
});

module.exports = router;
