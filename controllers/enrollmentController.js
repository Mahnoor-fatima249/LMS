const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// 1. Enroll in a Course (Student Only)
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id; // Yeh auth middleware se aayega

    // Check karein ke course exist karta hai ya nahi
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check karein ke pehle se enrolled toh nahi hai
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      user: userId,
      course: courseId
    });

    await enrollment.save();
    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Get Logged-in User's Enrolled Courses
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate({
      path: 'course',
      populate: { path: 'instructor', select: 'name email' }
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};