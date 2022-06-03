const User = require('../models/User');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const sendEmail = require('../utils/email');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
        expiresIn: '30d'
    });
};

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const skipVerification = process.env.SKIP_EMAIL_VERIFICATION === 'true';
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user = new User({
            firstName,
            lastName,
            email,
            password,
            otp: skipVerification ? undefined : otp,
            otpExpires: skipVerification ? undefined : otpExpires,
            isActivated: skipVerification
        });

        await user.save();

        if (!skipVerification) {
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Verify your LMS Account',
                    template: 'otp',
                    context: { otp }
                });
            } catch (emailErr) {
                console.error('Email sending failed:', emailErr);
            }
        }

        res.status(201).json({
            message: skipVerification 
                ? 'User registered and activated successfully.' 
                : 'User registered. Please verify your email with the OTP sent.',
            email,
            autoVerified: skipVerification
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

        user.isActivated = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isActivated: user.isActivated
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isActivated) {
            return res.status(403).json({ message: 'Please verify your email first' });
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isActivated: user.isActivated
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
