const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true},
        lastName: {type: String, required: true},
        username: { type: String, trim: true, required: true},
        email: { type: String, trim: true, required: true},
        password: { type: String, trim: true, required: true},
        admin: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);
module.exports = User;
