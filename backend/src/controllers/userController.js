const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, address, phone, paymentMethod } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        if (paymentMethod) user.paymentMethod = paymentMethod;

        await user.save();

        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const { theme, emailNotifications } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (theme) user.preferences.theme = theme;
        if (emailNotifications !== undefined) user.preferences.emailNotifications = emailNotifications;

        await user.save();

        res.json(user.preferences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
