
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err.message));

// Student schema
const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Home route
app.get('/', (req, res) => {
    res.send('Student API is running');
});

// GET all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

// GET student by ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findOne({
            id: Number(req.params.id)
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch student' });
    }
});

// POST a new student
app.post('/api/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create student. Check the fields and ensure the ID is unique.' });
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
