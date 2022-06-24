const express = require('express');
const { getUsers, updateUserRole, deleteUser } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/users')
    .get(protect, isAdmin, getUsers);

router.route('/users/:id')
    .put(protect, isAdmin, updateUserRole)
    .delete(protect, isAdmin, deleteUser);

module.exports = router;
