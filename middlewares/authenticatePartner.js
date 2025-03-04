const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig'); 


const authenticatePartner = (req, res, next) => {
    const token = req.cookies.partnerToken;
    if (!token) {
        return res.status(401).redirect('/partner-login');
    }

    jwt.verify(token, process.env.JWT_SECRET_PARTNER, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.', resolution: 'Goback and Login again to Continue...' });
        }

        db.query('SELECT * FROM partners WHERE partner_id = ?', [decoded.id], (error, results) => {
            if (error || results.length === 0) {
                return res.status(403).json({ message: 'Token not found in database.' });
            }
            req.user = decoded; 
            next();
        });
    });
};

module.exports = authenticatePartner;