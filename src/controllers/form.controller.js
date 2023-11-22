const contactForm = require('../models/form.model')

const sendContactForm = async (req, res) => {

    const { name, email, comment } = req.body

    try {
        const form = await new contactForm({
            name: name,
            email: email,
            comment: comment
        });

        const newContactFormEntry = await form.save()

        if(newContactFormEntry){
            return res.json({
                message: "form sent successfully",
                detail: {
                    name,
                    email,
                    comment
                }
            })
        } else {
            return res.status(400).json({
                message: "saving of form in DB failed."
            })
        }

    } catch (error) {
        return res.json({
            message: "error sending contact form"
        })
    }
}

module.exports = {sendContactForm}