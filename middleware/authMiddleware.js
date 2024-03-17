const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const token = req.headers.Authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;