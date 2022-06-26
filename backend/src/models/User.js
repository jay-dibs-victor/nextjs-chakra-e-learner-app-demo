const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    preferences: {
        theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
        emailNotifications: { type: Boolean, default: true }
    },
    otp: { type: String },
    otpExpires: { type: Date },
    enrolledCourses: [{
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        progress: { type: Number, default: 0 },
        completedUnits: [String]
    }],
    jobApplications: [{
        title: String,
        company: String,
        status: { type: String, enum: ['Applied', 'Technical', 'Interview', 'Offer', 'Accepted', 'Rejected'], default: 'Applied' },
        date: { type: Date, default: Date.now }
    }],
    address: { type: String },
    phone: { type: String },
    paymentMethod: {
        cardName: { type: String },
        cardType: { type: String },
        cardNumber: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
