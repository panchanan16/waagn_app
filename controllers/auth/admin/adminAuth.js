const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../../config/dbConfig');

//register admin ---
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO admin_auth (name, email, password) VALUES (?, ?, ?)'

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(query, [name, email, hashedPassword], (error, results) => {
            if (error) return res.status(500).json({ error, message: 'User not created!' });
            res.status(201).json({ message: 'Admin registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error, message: 'User not created!'});
    }
};


// Admin login ---
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM admin_auth WHERE email = ?'

    db.query(query, [email], async (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.length === 0) return res.status(401).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.admin_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save token in database
        const updateQuery = 'UPDATE admin_auth SET token = ? WHERE admin_id = ?';
        db.query(updateQuery, [token, user.admin_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving token in database', error: err });
            }
            res.cookie('adminToken', token, {
                // httpOnly: true,   
                // sameSite: 'Strict',
                maxAge: 3600000
              });
            res.status(200).json({ success: true, redirect: '/orders', message: 'Login successful', token, username: user.name });
        });
    });
};


exports.adminLogout = (req, res) => {
    const token = req.cookies.adminToken;
    const query = 'UPDATE admin_auth SET token = NULL WHERE admin_id = ?;';
  
    db.query(query, [req.user.id], (err, result) => {
      if (err) {
        console.error('Error blacklisting token:', err);
        return res.status(500).send('Error logging out');
      }
  
      // Send a response after successful logout
      res.clearCookie('adminToken');
      res.status(200).json({success: true, redirect: '/'})
    });

}