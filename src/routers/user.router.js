const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    login,
    logout,
    updateUser,
    deleteUser,
    updateUserPassword,
    updateUserEmail
}
    = require('../controllers/user.controller')
const auth = require ('../middlewares/validateToken')

router.post('/register', createUser); //*
router.post('/login', login); //*
router.post('/logout', auth, logout) //*
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser); // profile
router.put('/:id', auth, updateUser);
router.put('/pass/:id', auth, updateUserPassword);
router.put('/email/:id', auth, updateUserEmail )
router.delete('/:id', deleteUser)

module.exports = router;