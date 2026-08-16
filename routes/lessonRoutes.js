const express = require('express');
const router = express.Router();
const { addLesson, getCourseLessons } = require('../controllers/lessonController');
const auth = require('../middleware/authMiddleware');

// Lesson add karna protected route hai (Sirf instructor ke liye)
router.post('/', auth, addLesson);

// Kisi course ke sare lessons dekhne ka route
router.get('/:courseId', getCourseLessons);

module.exports = router;