const mongoose = require('mongoose')

const contactFormSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        comment: {type: String, required: true}
    }
)

const contactForm = mongoose.model('form', contactFormSchema)
module.exports = contactForm