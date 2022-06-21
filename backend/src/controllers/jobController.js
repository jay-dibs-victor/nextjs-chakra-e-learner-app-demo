const User = require('../models/User');

exports.applyForJob = async (req, res) => {
    try {
        const { title, company } = req.body;
        const user = await User.findById(req.user.id);

        user.jobApplications.push({ title, company, status: 'Applied' });
        await user.save();

        res.json({ message: 'Application submitted', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.jobApplications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId, status } = req.body;
        const user = await User.findById(req.user.id);

        const application = user.jobApplications.id(applicationId);
        if (!application) return res.status(404).json({ message: 'Application not found' });

        application.status = status;
        await user.save();

        res.json({ message: 'Status updated', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
