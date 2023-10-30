const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_JWT

const validateToken = (req, res, next) => {
    const cookieToken = req.cookies.token
    console.log(cookieToken)

    if (!cookieToken) return res.status(401).json({
        message: 'no autorizado para acceder.'
    })

    jwt.verify(cookieToken, SECRET, (err, userData) => {
        if (err) return res.status(403).json({
            message: 'invalid token'
        })

        req.userData = userData
        next()
    })
}


module.exports = validateToken