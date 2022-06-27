if (!global.crypto) {
  global.crypto = require('crypto');
}
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Course = require('./models/Course');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms_db',
    );

    console.log('Cleaning existing data...');
    await Product.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log('Seeding Categories...');
    const tech = await Category.create({ name: 'Technology', description: 'Tech and Innovation', icon: 'HiTerminal' });
    const design = await Category.create({ name: 'Design', description: 'Creative and Visual', icon: 'HiPencilAlt' });
    const business = await Category.create({ name: 'Business', description: 'Management and Growth', icon: 'HiBriefcase' });

    const webDev = await Category.create({ name: 'Web Development', parent: tech._id, description: 'Coding for the web' });
    const mobileDev = await Category.create({ name: 'Mobile Development', parent: tech._id, description: 'Apps for mobile' });
    const uiux = await Category.create({ name: 'UI/UX Design', parent: design._id, description: 'User interface design' });
    const marketing = await Category.create({ name: 'Digital Marketing', parent: business._id, description: 'Growth and SEO' });

    console.log('Generating 30 Courses and Products...');
    const categories = [webDev, mobileDev, uiux, marketing];
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    
    const courseTemplates = [
      { title: 'React Mastery', desc: 'Deep dive into React hooks and patterns.' },
      { title: 'Node.js Backend', desc: 'Scalable backends with Express and Nest.' },
      { title: 'Next.js 13+', desc: 'App router, server components and more.' },
      { title: 'TypeScript for Pros', desc: 'Typing your JavaScript applications.' },
      { title: 'GraphQL API Design', desc: 'Building efficient APIs with Apollo.' },
      { title: 'Python for Data Science', desc: 'Pandas, Numpy and Scikit-learn.' },
      { title: 'iOS with Swift', desc: 'Native app development for Apple devices.' },
      { title: 'Android with Kotlin', desc: 'Modern Android development patterns.' },
      { title: 'Figma to Code', desc: 'Design systems and implementation.' },
      { title: 'Chakra UI Pro', desc: 'Building beautiful accessible UIs.' },
    ];

    const allCourses = [];
    for (let i = 1; i <= 30; i++) {
      const template = courseTemplates[(i - 1) % courseTemplates.length];
      const cat = categories[(i - 1) % categories.length];
      const level = levels[(i - 1) % levels.length];
      
      const courseData = {
        title: `${template.title} Vol ${Math.ceil(i/10)}`,
        description: template.desc,
        price: 50000 + (i * 1000),
        category: cat._id,
        level: level,
        instructor: {
          name: `Instructor ${i}`,
          role: 'Expert Trainer',
          bio: 'Years of industry experience.'
        },
        thumbnail: `/img/courses/course-${(i % 5) + 1}.jpg`,
        sections: [
          {
            title: 'Core Fundamentals',
            subSections: [
              {
                title: 'Phase 1: Getting Started',
                units: [
                  { 
                    title: 'Strategic Welcome & Overview', 
                    type: 'video', 
                    content: 'dQw4w9WgXcQ', 
                    duration: '05:00', 
                    isFree: true 
                  },
                  { 
                    title: 'Environment Architecture Setup', 
                    type: 'text', 
                    content: 'In this module, we will explore the structural requirements for a high-performance development environment. You will learn how to configure your workspace for maximum efficiency and scalability.', 
                    duration: '15:00', 
                    isFree: false 
                  }
                ]
              },
              {
                title: 'Phase 2: Masterclass Implementation',
                units: [
                  { 
                    title: 'Advanced Pattern Deep Dive', 
                    type: 'video', 
                    content: 'y6120QOlsfU', 
                    duration: '25:00', 
                    isFree: false 
                  },
                  { 
                    title: 'Knowledge Assessment Wizard', 
                    type: 'quiz', 
                    content: {
                      question: 'Which architecture pattern best ensures scalability in distributed systems?',
                      options: [
                        'Monolithic Architecture',
                        'Microservices Architecture',
                        'Serverless Computing',
                        'Event-Driven Architecture'
                      ],
                      correct: 'Microservices Architecture',
                      wizard: [
                        { q: 'What is the primary benefit of decoupling services?', a: 'Fault isolation and independent scaling' },
                        { q: 'Which protocol is standard for service-to-service communication?', a: 'gRPC or REST' },
                        { q: 'Define the CAP theorem in the context of databases.', a: 'Consistency, Availability, and Partition Tolerance' },
                        { q: 'What is a message broker?', a: 'An intermediary for asynchronous communication' },
                        { q: 'What is horizontal scaling?', a: 'Adding more instances of a resource' }
                      ]
                    },
                    duration: '20:00', 
                    isFree: false 
                  }
                ]
              }
            ]
          }
        ]
      };
      allCourses.push(courseData);
    }

    const createdCourses = await Course.insertMany(allCourses);

    // Seed Products as well (mapping courses to products)
    const allProducts = createdCourses.map(course => ({
      name: course.title,
      description: course.description,
      price: course.price,
      category: 'Course Package',
      image: course.thumbnail,
      stock: 999
    }));
    await Product.insertMany(allProducts);

    console.log('Seeding Users...');
    const plainPassword = 'password123';
    
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@lms.com',
      password: plainPassword,
      role: 'admin',
      isActivated: true,
    });

    const testUser = new User({
      firstName: 'Alex',
      lastName: 'Hacker',
      email: 'alex@example.com',
      password: plainPassword,
      isActivated: true,
      role: 'user',
      enrolledCourses: [
        {
          course: createdCourses[0]._id,
          progress: 50,
          completedUnits: [createdCourses[0].sections[0].subSections[0].units[0]._id],
        },
      ],
    });
    await testUser.save();

    console.log('30 Courses and Products Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
