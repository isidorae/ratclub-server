const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_JWT

function createAccessToken(data) {

    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            SECRET,
            {expiresIn: "1d"},
            (err, token) => {
                if(err) reject(err);
                resolve(token)
            }
            )
    })
}

module.exports = {createAccessToken}