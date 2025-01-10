const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig'); 


const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        db.query('SELECT * FROM admin_auth WHERE id = ?', [decoded.id], (error, results) => {
            if (error || results.length === 0) {
                return res.status(403).json({ message: 'Token not found in database.' });
            }

            req.user = decoded; 
            next();
        });
    });
};

module.exports = authenticate;
