const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    login,
    logout,
    profile,
    updateUser,
    deleteUser,
    updateUserPassword,
    updateUserEmail
}
    = require('../controllers/user.controller')
const validateToken = require('../middlewares/validateToken')

router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', logout)
router.get('/profile', validateToken, profile)
router.get('/', validateToken, getUsers);
router.get('/:id', getUser);
router.put('/:id', validateToken, updateUser);
router.put('/pass/:id', validateToken, updateUserPassword);
router.put('/email/:id', validateToken, updateUserEmail )
router.delete('/:id', deleteUser)

module.exports = router;