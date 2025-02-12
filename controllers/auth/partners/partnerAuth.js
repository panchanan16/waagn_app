const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../../config/dbConfig');

exports.createuser = (req, res) => {
    const { partner_id, name, user_name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);    
    const query = 'INSERT INTO partners (partner_id, name, user_name, password) VALUES (?, ?, ?, ?)'
    db.query(query, [partner_id, name, user_name, hashedPassword], (err, result)=> {
        if (err) {
            return res.status(500).json({success: false, message: "Failed to create User"})
        }

        return res.status(200).json({success: true, message: "User created successfully!"})
    })
}


// Get all users ---
exports.getUsers = (req, res) => {
    const query = 'SELECT partner_companies.company_name, partners.name, partners.user_name, partners.partner_id FROM partners INNER JOIN partner_companies ON partner_companies.company_id = partners.partner_id'
    db.query(query, (err, result)=> {
        if (err) {
            return res.status(500).json({success: false, message: "Failed to fetch User"})
        }

        return res.status(200).json({success: true, message: "User fetched successfully!", data: result})
    })
}




// DELETE a user ---
exports.deleteUser = (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM partners WHERE partner_id = ?'
    db.query(query, [id], (err, result)=> {
        if (err) {
            console.log(err)
            return res.status(500).json({success: false, message: "Failed to delete User"})
        }

        return res.status(200).json({success: true, message: "User deleted successfully!", data: result})
    })
}


// Login a user ---
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM partners WHERE user_name = ?'

    db.query(query, [email], async (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.length === 0) return res.status(401).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.partner_id }, process.env.JWT_SECRET_PARTNER, { expiresIn: '1h' });

        // Save token in database
        const updateQuery = 'UPDATE partners SET token = ? WHERE partner_id = ?';
        db.query(updateQuery, [token, user.partner_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving token in database', error: err });
            }
            res.cookie('partnerToken', token, {
                // httpOnly: true,   
                // sameSite: 'Strict',
                maxAge: 3600000
              });

            res.status(200).json({ 
                success: true, 
                redirect: '/partner-dashboard', 
                message: 'Login successful', 
                token, 
                id: user.partner_id, 
                name: user.name
            });
        });
    });
};