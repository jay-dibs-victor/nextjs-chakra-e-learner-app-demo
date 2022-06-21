const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:2717/lms_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lms', require('./routes/lmsRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.get('/', (req, res) => res.send('LMS API Running...'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
