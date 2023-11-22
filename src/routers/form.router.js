const express = require('express')
const router = express.Router()
const {sendContactForm} = require('../controllers/form.controller')

router.post('/', sendContactForm);

module.exports = router;