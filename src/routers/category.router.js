const express = require('express');
const router = express.Router()
const {
    getCategories,
    getCategory,
    addCategory,
    deleteCategory,
    editCategory
} = require('../controllers/category.controller')

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', addCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', editCategory);


module.exports = router; 