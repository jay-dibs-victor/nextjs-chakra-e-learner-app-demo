const express = require('express');
const { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(protect, isAdmin, createCategory);

router.route('/:id')
    .put(protect, isAdmin, updateCategory)
    .delete(protect, isAdmin, deleteCategory);

module.exports = router;
