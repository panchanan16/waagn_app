const db = require('../../config/dbConfig');

// Insert Driver data
async function registerDriver(req, res) {
    const file = req.file;
    console.log(file)
    const { driver_name, contact_number, dl_number, aadhaar_card_number, current_address, permanent_address, alt_number, whatsapp_number, emergency_number} = req.body;

    const query = `
        INSERT INTO drivers (driver_name, contact_number, dl_number, aadhaar_card_number, current_address, permanent_address, alt_number, whatsapp_number, driver_photo, emergency_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [driver_name, contact_number, dl_number, aadhaar_card_number, current_address, permanent_address, alt_number, whatsapp_number, file.originalname, emergency_number], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to insert driver data' });
        }
        res.status(201).json({ message: 'Driver added successfully', driverId: results.insertId, success: true });
    });
}

// Read all drivers
function getAllDrivers(req, res) {
    const query = 'SELECT * FROM drivers';

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve drivers data' });
        }
        res.status(200).json(results);
    });
}


// Read drivers for dropdown ---
function getAllDriversForDropdown(req, res) {
    const query = 'SELECT driver_id, driver_name, driver_status FROM drivers';

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({success: false, error: 'Failed to retrieve drivers data' });
        }
        res.status(200).json({success: true, data: results});
    });
}

// update drivers --

function updateDriver(req, res) {
    const driver_id = req.params.driver_id;
    const { contact_number, dl_number, aadhaar_card_number, current_address, permanent_address, alt_number, whatsapp_number, driver_photo, emergency_number, driver_status } = req.body;

    const query = `
        UPDATE drivers
        SET contact_number = ?, dl_number = ?, aadhaar_card_number = ?, current_address = ?, permanent_address = ?, alt_number = ?, whatsapp_number = ?, driver_photo = ?, emergency_number = ?, driver_status = ?
        WHERE driver_id = ?
    `;

    db.query(query, [contact_number, dl_number, aadhaar_card_number, current_address, permanent_address, alt_number, whatsapp_number, driver_photo, emergency_number, driver_status, driver_id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to update driver data' });
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Driver updated successfully' });
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }
    });
}

module.exports = {registerDriver, updateDriver, getAllDrivers, getAllDriversForDropdown}