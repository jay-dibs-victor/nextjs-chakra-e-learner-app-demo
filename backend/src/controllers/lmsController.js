const User = require('../models/User');
const Course = require('../models/Course');

exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const user = await User.findById(req.user._id);
        const course = await Course.findById(courseId);

        if (!course) return res.status(404).json({ message: 'Course not found' });

        const alreadyEnrolled = user.enrolledCourses.find(c => c.course.toString() === courseId);
        if (alreadyEnrolled) return res.status(400).json({ message: 'Already enrolled' });

        user.enrolledCourses.push({ course: courseId, progress: 0 });
        await user.save();

        res.json({ message: 'Successfully enrolled', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const { courseId, unitId, progress } = req.body;
        const user = await User.findById(req.user._id);

        const courseProgress = user.enrolledCourses.find(c => c.course.toString() === courseId);
        if (!courseProgress) return res.status(404).json({ message: 'Not enrolled in this course' });

        if (unitId && !courseProgress.completedUnits.includes(unitId)) {
            courseProgress.completedUnits.push(unitId);
        }
        
        if (progress !== undefined) {
            courseProgress.progress = progress;
        }

        await user.save();
        res.json({ message: 'Progress updated', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('enrolledCourses.course');
        res.json(user.enrolledCourses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
