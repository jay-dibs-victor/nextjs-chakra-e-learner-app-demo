const mongoose = require('mongoose');
const Product = require('./models/Product');
const Course = require('./models/Course');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:2717/lms_db');
        
        await Product.deleteMany();
        await Course.deleteMany();

        const products = [
            { name: 'Ergonomic Desk', description: 'Premium wooden desk', price: 120000, category: 'Furniture', image: '/img/desk.png' },
            { name: 'Mechanical Keyboard', description: 'RGB Gaming Keyboard', price: 45000, category: 'Tech', image: '/img/keyboard.png' }
        ];

        const courses = [
            {
                title: 'Full-Stack Web Development',
                description: 'Master modern web technologies',
                price: 85000,
                category: 'Development',
                level: 'Intermediate',
                instructor: { name: 'Dr. Elena Rodriguez', role: 'Architect' },
                sections: [
                    {
                        title: 'Module 1',
                        units: [
                            { title: 'Intro', type: 'video', content: 'dQw4w9WgXcQ', duration: '10:00', isFree: true },
                            { title: 'Setup', type: 'text', content: 'Installation guide...', duration: '05:00', isFree: true }
                        ]
                    }
                ]
            }
        ];

        await Product.insertMany(products);
        await Course.insertMany(courses);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
