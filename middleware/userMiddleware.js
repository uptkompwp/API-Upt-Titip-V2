const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const userMiddleware = {}

userMiddleware.authenticateUser = (req, res, next) => {
    const authorizationHeader = req.header('Authorization')

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = decodedToken

        next()
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
}

userMiddleware.authorizeROle = (...requiredRoles) => {
    return async (req, res, next) => {
        const { user } = req
        console.log(user.role);
        if (!user || !requiredRoles.some(role => user.role === role)) {
            return res.status(403).json({ error: 'Hak akses ditolak ! ' });
        }

        next()
    }
}

module.exports = userMiddleware

