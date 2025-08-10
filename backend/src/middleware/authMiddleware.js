require('dotenv').config();

const API_SECRET_KEY = process.env.API_SECRET_KEY;

if (!API_SECRET_KEY) {
    console.warn("Warning: API_SECRET_KEY is not set. API endpoints will not be protected.");
}

const authMiddleware = (req, res, next) => {
    // If no secret key is set, skip authentication
    if (!API_SECRET_KEY) {
        return next();
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No authorization header provided.' });
    }

    const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (token !== API_SECRET_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid API secret key.' });
    }

    next();
};

module.exports = authMiddleware;
