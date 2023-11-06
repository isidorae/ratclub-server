// const jwt = require('jsonwebtoken');
const jwt = require('express-jwt');
const SECRET = process.env.SECRET_JWT

const getToken = (req) => {
    let { authorization } = req.headers;
    if (authorization) {
        let [ type, token ] = authorization.split(' ');
        return (type === 'Token' || type === 'Bearer') ? token : null;
    }
}

const auth = jwt.expressjwt(
    {
        secret: SECRET,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken
    }
)

module.exports = auth;






// const validateToken = (req, res, next) => {
//     const cookieToken = req.cookies.token
//     console.log(cookieToken)

//     if (!cookieToken) return res.status(401).json({
//         message: 'no autorizado para acceder.'
//     })

//     jwt.verify(cookieToken, SECRET, (err, userData) => {
//         if (err) return res.status(403).json({
//             message: 'invalid token'
//         })

//         req.userData = userData
//         next()
//     })
// }


// module.exports = validateToken