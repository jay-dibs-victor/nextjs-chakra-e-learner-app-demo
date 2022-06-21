const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const Course = require('./models/Course');
const User = require('./models/User');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:2717/lms_db');
        
        console.log('Cleaning existing data...');
        await Product.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        console.log('Seeding Products...');
        const products = [
            { name: 'Ergonomic Desk Pro', description: 'Premium height-adjustable wooden desk for professional engineers.', price: 185000, category: 'Furniture', image: '/img/desk.png' },
            { name: 'Mechanical Keyboard RGB', description: 'Ultra-responsive tactile feedback with customizable RGB lighting.', price: 55000, category: 'Tech', image: '/img/keyboard.png' },
            { name: 'Noise Cancelling Headphones', description: 'Studio quality sound with active noise cancellation.', price: 95000, category: 'Tech', image: '/img/headphones.png' },
            { name: 'Executive Office Chair', description: 'Breathable mesh with 4D lumbar support.', price: 110000, category: 'Furniture', image: '/img/chair.png' }
        ];
        const createdProducts = await Product.insertMany(products);

        console.log('Seeding Courses...');
        const courses = [
            {
                title: 'Advanced Full-Stack Engineering',
                description: 'Master Next.js, Express, and MongoDB with real-world projects.',
                price: 85000,
                category: 'Development',
                level: 'Advanced',
                instructor: { name: 'Dr. Elena Rodriguez', role: 'Architect' },
                sections: [
                    {
                        title: 'Module 1: Architecture Design',
                        subSections: [
                            {
                                title: 'System Scalability',
                                units: [
                                    { title: 'Intro to Microservices', type: 'video', content: 'dQw4w9WgXcQ', duration: '12:00', isFree: true },
                                    { title: 'Database Indexing', type: 'text', content: 'Advanced indexing techniques...', duration: '08:00', isFree: false }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: 'UI/UX Design Masterclass',
                description: 'Build stunning interfaces using Figma and Chakra UI.',
                price: 75000,
                category: 'Design',
                level: 'Intermediate',
                instructor: { name: 'Marcus Thorne', role: 'Lead Designer' },
                sections: [
                    {
                        title: 'Module 1: Visual Design',
                        subSections: [
                            {
                                title: 'Color Theory',
                                units: [
                                    { title: 'HSL vs RGB', type: 'video', content: 'y6120QOlsfU', duration: '15:00', isFree: true }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        const createdCourses = await Course.insertMany(courses);

        console.log('Seeding Users...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        const testUser = new User({
            firstName: 'Alex',
            lastName: 'Hacker',
            email: 'alex@example.com',
            password: hashedPassword,
            isActivated: true,
            enrolledCourses: [
                {
                    course: createdCourses[0]._id,
                    progress: 45,
                    completedUnits: [createdCourses[0].sections[0].subSections[0].units[0]._id]
                }
            ],
            jobApplications: [
                { title: 'Senior Frontend Developer', company: 'Google', status: 'Technical', date: new Date('2022-05-26') },
                { title: 'UI Engineer', company: 'Meta', status: 'Accepted', date: new Date('2022-05-24') }
            ]
        });
        await testUser.save();

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedData();
