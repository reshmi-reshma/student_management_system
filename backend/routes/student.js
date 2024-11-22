const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a student
router.put('/update/:id', async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Student updated successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a student
router.delete('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student deleted successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
