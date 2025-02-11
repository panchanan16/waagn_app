const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../../config/dbConfig');

exports.createuser = (req, res) => {
    const { partner_id, user_name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);    
    const query = 'INSERT INTO partners (partner_id, user_name, password) VALUES (?, ?, ?)'
    db.query(query, [partner_id, user_name, hashedPassword], (err, result)=> {
        if (err) {
            return res.status(500).json({success: false, message: "Failed to create User"})
        }

        return res.status(200).json({success: true, message: "User created successfully!"})
    })
}