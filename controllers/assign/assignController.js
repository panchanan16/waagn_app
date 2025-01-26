const db = require('../../config/dbConfig');


// ---------------------- Partner Assign Controllers ---------------------------

// Create a new partner assignment
exports.createPartnerAssign = (req, res) => {
  const { order_id, partner_id, godown_id} = req.body;

  const query = 'INSERT INTO partner_assign (order_id, partner_id, godown_id) VALUES (?, ?, ?)';
  db.query(query, [order_id, partner_id, godown_id], (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      return res.status(500).send({ success: false, message: 'Failed to create partner assignment', error: err });
    }
    return res.status(201).send({ success: true, message: 'Partner assignment created successfully', data: result });
  });
};

// Get all partner assignments
exports.getAllPartnerAssigns = (req, res) => {
  const query = 'SELECT * FROM partner_assign';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).send({ success: false, message: 'Failed to fetch partner assignments', error: err });
    }
    return res.status(200).send({ success: true, message: 'Fetched all partner assignments', data: results });
  });
};

// Get a partner assignment by ID
exports.getPartnerAssignById = (req, res) => {
  const { p_assign_id } = req.params;

  const query = 'SELECT * FROM partner_assign WHERE p_assign_id = ?';
  db.query(query, [p_assign_id], (err, result) => {
    if (err) {
      console.error('Error fetching record:', err);
      return res.status(500).send({ success: false, message: 'Failed to fetch partner assignment', error: err });
    }
    if (result.length === 0) {
      return res.status(404).send({ success: false, message: 'Partner assignment not found' });
    }
    return res.status(200).send({ success: true, message: 'Fetched partner assignment', data: result[0] });
  });
};

// Update a partner assignment
exports.updatePartnerAssign = (req, res) => {
  const { p_assign_id } = req.params;
  const { order_id, partner_id, godown_id, datetime, msg_for_partner } = req.body;

  const query = 'UPDATE partner_assign SET order_id = ?, partner_id = ?, godown_id = ?, datetime = ?, msg_for_partner = ? WHERE p_assign_id = ?';
  db.query(query, [order_id, partner_id, godown_id, datetime, msg_for_partner, p_assign_id], (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      return res.status(500).send({ success: false, message: 'Failed to update partner assignment', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ success: false, message: 'Partner assignment not found' });
    }
    res.status(200).send({ success: true, message: 'Partner assignment updated successfully', data: result });
  });
};

// Delete a partner assignment
exports.deletePartnerAssign = (req, res) => {
  const { p_assign_id } = req.params;

  const query = 'DELETE FROM partner_assign WHERE p_assign_id = ?';
  db.query(query, [p_assign_id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).send({ success: false, message: 'Failed to delete partner assignment', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ success: false, message: 'Partner assignment not found' });
    }
    res.status(200).send({ success: true, message: 'Partner assignment deleted successfully' });
  });
};



// ---------------------- Vehicle Assign Controllers ---------------------------



// Create a new vehicle assignment
exports.createVehicleAssignment = (req, res) => {
  const { order_id, vehicle_id, driver_id, msg_for_driver } = req.body;

  const query = `
    INSERT INTO vehicle_assignment (order_id, vehicle_id, driver_id, msg_for_driver)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [order_id, vehicle_id, driver_id, msg_for_driver], (err, result) => {
    if (err) {
      console.error('Error inserting vehicle assignment:', err);
      return res.status(500).json({ error: 'Error inserting vehicle assignment' });
    }

    return res.status(201).json({ success: true, message: 'Vehicle assignment created successfully' });
  });
};


