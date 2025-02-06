const db = require('../../config/dbConfig');


// Create Our godowns --- 
exports.createGodown = (req, res) => {
    const { town, type_of_godown, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_name } = req.body;

    const query = `INSERT INTO our_godown (town, type_of_godown, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_name) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [town, type_of_godown, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_name], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error inserting our godowns", error: err.message });
        }
        res.status(201).json({ success: true, message: "Godown created successfully", data: result });
    });
};


// GET all Our godowns ---
exports.getAllGodown = (req, res) => {
    const query = 'SELECT * FROM our_godown';

    db.query(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error fetching Our godown", error: err.message });
        }

        res.status(200).json({ success: true, data: rows });
    });
};

// GET One godowns ---
exports.getOneGodown = (req, res) => {
    const {id} = req.params;
    const query = 'SELECT * FROM our_godown WHERE godown_id = ?';

    db.query(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error fetching Our godown", error: err.message });
        }

        res.status(200).json({ success: true, data: rows });
    });
};

// Function to Update a location Status
exports.updateOurLocationStatus = (req, res) => {
    const {id} = req.params
    const query = 'UPDATE our_godown SET is_active = ? WHERE godown_id = ?';

    db.query(query, [req.body.status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Godown Status Not Updated!', error: err });
        }
        return res.status(200).json({ success: true, message: 'Godown Status Updated Successfully!', data: results });
    });
}