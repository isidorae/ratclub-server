const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const SECRET = process.env.SECRET_JWT

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

// userSchema.methods.generateJWT = () => {
//     return jwt.sign(
//         {userID: this._id},
//         SECRET,
//         { expiresIn: "1d"},
//         (err, token) => {
//             if (err) console.log(err)
//             res.cookie('token', token)
//             res.json({ message: 'token created'})
//         }
//     )
// }

// userSchema.methods.onSignUpGenerateJWT = function () {
//     return {
//         userID: this._id,
//         token: this.generateJWT()
//     }
// }

const User = mongoose.model('user', userSchema);
module.exports = User;
