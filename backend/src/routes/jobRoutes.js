const express = require('express');
const { applyForJob, getApplications, updateApplicationStatus } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, applyForJob);
router.get('/', protect, getApplications);
router.patch('/status', protect, updateApplicationStatus);

module.exports = router;
