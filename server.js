const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const courseRoutes = require('./routes/courseRoutes'); // Import course routes
const enrollmentRoutes = require('./routes/enrollmentRoutes'); // Import enrollment routes
const lessonRoutes = require('./routes/lessonRoutes'); // Import lesson routes

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/lessons', lessonRoutes); // Mount lesson routes

// Basic Test Route
app.get('/', (req, res) => {
  res.send('LMS API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});