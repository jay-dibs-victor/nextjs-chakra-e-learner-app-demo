if (!global.crypto) {
  global.crypto = require('crypto');
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/api/test', (req, res) => res.json({ message: 'API is working', timestamp: new Date().toISOString() }));

// Routes
app.use(['/api/auth', '/auth'], require('./routes/authRoutes'));
app.use(['/api/users', '/users'], require('./routes/userRoutes'));
app.use(['/api/products', '/products'], require('./routes/productRoutes'));
app.use(['/api/courses', '/courses'], require('./routes/courseRoutes'));
app.use(['/api/lms', '/lms'], require('./routes/lmsRoutes'));
app.use(['/api/jobs', '/jobs'], require('./routes/jobRoutes'));
app.use(['/api/categories', '/categories', '/api/product-categories', '/product-categories'], require('./routes/categoryRoutes'));
app.use(['/api/admin', '/admin'], require('./routes/adminRoutes'));

app.get('/', (req, res) => res.send('LMS API Running...'));

// 404 Debug Handler
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: 'Route not found',
    requestedPath: req.originalUrl,
    method: req.method,
    hint: 'Check if the endpoint exists in the backend routes/ directory',
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
