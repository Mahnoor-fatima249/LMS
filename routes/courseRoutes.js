const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../controllers/courseController');
const auth = require('../middleware/authMiddleware');

router.get('/', getAllCourses);
router.post('/', auth, createCourse);

console.log("createCourse:", typeof createCourse); // Debugging ke liye
console.log("auth:", typeof auth);                 // Debugging ke liye

module.exports = router;