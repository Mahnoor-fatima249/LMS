const express = require('express');
const router = express.Router();
const { enrollCourse, getMyEnrollments } = require('../controllers/enrollmentController');
const auth = require('../middleware/authMiddleware');

// Student apna course enroll karega aur apne enrollments dekhega (Dono protected routes hain)
router.post('/', auth, enrollCourse);
router.get('/my-courses', auth, getMyEnrollments);

module.exports = router;