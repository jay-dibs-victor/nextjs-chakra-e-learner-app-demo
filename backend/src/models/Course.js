const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'quiz', 'iframe', 'text'], required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true }, // URL, text, or quiz object
    duration: { type: String },
    isFree: { type: Boolean, default: false }
});

const SubSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    units: [UnitSchema]
});

const SectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subSections: [SubSectionSchema]
});

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: {
        name: String,
        role: String,
        avatar: String,
        bio: String
    },
    thumbnail: { type: String },
    category: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    sections: [SectionSchema],
    ratings: { type: Number, default: 0 },
    enrolledCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
