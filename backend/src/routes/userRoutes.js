const express = require('express');
const { getProfile, updateProfile, updatePreferences } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);

router.route('/preferences')
    .put(protect, updatePreferences);

module.exports = router;
