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

//token validation
const auth = jwt.expressjwt(
    {
        secret: SECRET,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken
    }
)

module.exports = auth;

