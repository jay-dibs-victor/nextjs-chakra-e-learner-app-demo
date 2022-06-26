const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const Course = require('./models/Course');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms_db');
        
        console.log('Cleaning existing data...');
        await Product.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log('Seeding Categories...');
        // Parent Categories
        const tech = await Category.create({ name: 'Technology', description: 'Everything about tech and innovation', icon: 'HiTerminal' });
        const design = await Category.create({ name: 'Design', description: 'Visual arts and user experience', icon: 'HiPencilAlt' });
        const business = await Category.create({ name: 'Business', description: 'Entrepreneurship and growth', icon: 'HiBriefcase' });

        // Development (Child of Tech)
        const dev = await Category.create({ name: 'Development', parent: tech._id, description: 'Software engineering and coding' });
        const webDev = await Category.create({ name: 'Web Development', parent: dev._id, description: 'Building the modern web' });
        const mobileDev = await Category.create({ name: 'Mobile Development', parent: dev._id, description: 'iOS and Android development' });

        // UI/UX (Child of Design)
        const uiux = await Category.create({ name: 'UI/UX Design', parent: design._id, description: 'User interfaces and experience' });

        // Marketing (Child of Business)
        const marketing = await Category.create({ name: 'Digital Marketing', parent: business._id, description: 'Online growth strategies' });

        console.log('Seeding Products...');
        const products = [
            { name: 'Ergonomic Desk Pro', description: 'Premium height-adjustable wooden desk for professional engineers.', price: 185000, category: 'Furniture', image: '/img/desk.png' },
            { name: 'Mechanical Keyboard RGB', description: 'Ultra-responsive tactile feedback with customizable RGB lighting.', price: 55000, category: 'Tech', image: '/img/keyboard.png' },
            { name: 'Noise Cancelling Headphones', description: 'Studio quality sound with active noise cancellation.', price: 95000, category: 'Tech', image: '/img/headphones.png' },
            { name: 'Executive Office Chair', description: 'Breathable mesh with 4D lumbar support.', price: 110000, category: 'Furniture', image: '/img/chair.png' }
        ];
        await Product.insertMany(products);

        console.log('Seeding Courses...');
        const courses = [
            {
                title: 'Mastering React & Next.js',
                description: 'Build production-ready applications with the latest React features.',
                price: 85000,
                category: webDev._id,
                level: 'Advanced',
                instructor: { name: 'Dr. Elena Rodriguez', role: 'Senior Architect', bio: '15 years of web experience.' },
                thumbnail: '/img/herolanding.jpg',
                sections: [
                    {
                        title: 'Getting Started',
                        subSections: [
                            {
                                title: 'Project Setup',
                                units: [
                                    { title: 'Welcome to the Course', type: 'video', content: 'dQw4w9WgXcQ', duration: '05:00', isFree: true },
                                    { title: 'Course Resources', type: 'pdf', content: 'https://example.com/syllabus.pdf', duration: '02:00', isFree: true }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Core Concepts',
                        subSections: [
                            {
                                title: 'Hooks & State',
                                units: [
                                    { title: 'Advanced useMemo', type: 'video', content: 'y6120QOlsfU', duration: '15:00', isFree: false },
                                    { 
                                        title: 'Hooks Quiz', 
                                        type: 'quiz', 
                                        content: {
                                            questions: [
                                                { question: 'What does useMemo do?', options: ['Cache values', 'Trigger effects', 'Create refs'], answer: 0 }
                                            ]
                                        }, 
                                        duration: '10:00', 
                                        isFree: false 
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Figma to Code',
                description: 'Transform your designs into high-fidelity Chakra UI components.',
                price: 75000,
                category: uiux._id,
                level: 'Intermediate',
                instructor: { name: 'Marcus Thorne', role: 'Lead Designer', bio: 'Expert in design systems.' },
                thumbnail: '/img/skillacquisition.jpg',
                sections: [
                    {
                        title: 'Design Phase',
                        subSections: [
                            {
                                title: 'Auto Layout Masterclass',
                                units: [
                                    { title: 'The Power of Stacks', type: 'video', content: 'y6120QOlsfU', duration: '20:00', isFree: true },
                                    { title: 'Grid vs Flex', type: 'text', content: '<h1>Grid vs Flex</h1><p>Comparison of layout models...</p>', duration: '12:00', isFree: false }
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
        
        // Admin User
        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@lms.com',
            password: hashedPassword,
            role: 'admin',
            isActivated: true
        });

        // Test Learner
        const testUser = new User({
            firstName: 'Alex',
            lastName: 'Hacker',
            email: 'alex@example.com',
            password: hashedPassword,
            isActivated: true,
            role: 'user',
            enrolledCourses: [
                {
                    course: createdCourses[0]._id,
                    progress: 25,
                    completedUnits: [createdCourses[0].sections[0].subSections[0].units[0]._id]
                }
            ],
            preferences: {
                theme: 'dark',
                emailNotifications: true
            }
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
