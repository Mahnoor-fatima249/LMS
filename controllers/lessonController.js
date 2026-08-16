const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// 1. Add Lesson to a Course (Instructor Only)
exports.addLesson = async (req, res) => {
  try {
    const { courseId, title, content, videoUrl } = req.body;

    // Check karein ke course exist karta hai ya nahi
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check karein ke jo instructor request bhej raha hai, wahi is course ka malik hai ya nahi
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add lessons to this course' });
    }

    const lesson = new Lesson({
      course: courseId,
      title,
      content,
      videoUrl
    });

    await lesson.save();
    res.status(201).json({ message: 'Lesson added successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Get All Lessons for a Specific Course (Public or Enrolled)
exports.getCourseLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ course: courseId });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};