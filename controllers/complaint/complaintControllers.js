const db = require('../../config/dbConfig');

exports.createComplaint = (req, res) => {
        const {
          customer_name,
          order_id_tracking_number,
          contact_number,
          email_id,
          complaint_type,
          description_of_issue,
          preferred_resolution,
          date_of_complaint,
          customer_person_handling_concern
        } = req.body;
      
        const query = `INSERT INTO customer_complaints 
          (customer_name, order_id_tracking_number, contact_number, email_id, complaint_type, description_of_issue, preferred_resolution, date_of_complaint, customer_person_handling_concern) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
        db.query(query, [
          customer_name,
          order_id_tracking_number,
          contact_number,
          email_id,
          complaint_type,
          description_of_issue,
          preferred_resolution,
          date_of_complaint,
          customer_person_handling_concern
        ], (err, result) => {
          if (err) {
            console.error('Error inserting complaint: ', err);
            return res.status(500).json({success: false, message: 'Failed to create complaint!'});
          }
          res.status(201).json({ message: 'Complaint added successfully', success: true});
        });
      }


// Read all complaints ---
exports.getAllComplaints = (req, res) => {
    const query = 'SELECT * FROM customer_complaints;';

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Failed to retrieve complaints data' });
        }
        res.status(200).json({success: true, data: results});
    });
}


// Read One complaints ---
exports.getOneComplaint = (req, res) => {
    const { id } = req.params
    const query = 'SELECT * FROM customer_complaints WHERE complain_id = ?;';

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Failed to retrieve complaints data' });
        }
        res.status(200).json({success: true, data: results});
    });
}


// Delete a complaints ---
exports.deleteComplaint = (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM customer_complaints WHERE complain_id = ?;';

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Failed to retrieve complaints data' });
        }
        res.status(200).json({success: true, data: results});
    });
}
