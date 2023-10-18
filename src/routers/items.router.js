const express = require('express');
const router = express.Router()

const {
    getItems,
    getItem,
    addItem,
    editItem,
    deleteItem,
    getFeaturedItems,
    itemsByCategory } = require('../controllers/item.controller')


router.get('/', getItems);
router.get('/:id', getItem);
// router.get('/web', getItemForWeb);
router.post('/:id', addItem);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);
router.get('/featured/:count', getFeaturedItems);
router.get('/collection/:category', itemsByCategory);

module.exports = router; 