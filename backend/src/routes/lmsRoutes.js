const express = require('express');
const { enrollInCourse, updateProgress, getEnrolledCourses } = require('../controllers/lmsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enroll', protect, enrollInCourse);
router.post('/progress', protect, updateProgress);
router.get('/my-courses', protect, getEnrolledCourses);

module.exports = router;
