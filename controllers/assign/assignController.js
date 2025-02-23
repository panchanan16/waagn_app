const db = require('../../config/dbConfig');
const sendWhatsAppMsg = require('../../templates/sendWhatsAppMsg');
const getWhatsappReciverFromDb = require('../../utils/getWhatsappRecieverDb');


// ---------------------- Partner Assign Controllers ---------------------------

// Create a new partner assignment
exports.createPartnerAssign = (req, res) => {
  const { order_id, partner_id, godown_id } = req.body;

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
  const query = 'SELECT partner_assign.order_id, partner_assign.partner_id, partner_assign.is_accepted, orders.receiver_name, orders.receiver_town, orders.order_status, orders.is_partner_accepted, company_name, full_address, contact_person_name FROM partner_assign INNER JOIN orders ON orders.order_id = partner_assign.order_id INNER JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id INNER JOIN partner_godown ON partner_assign.partner_id = partner_godown.partner_id AND partner_assign.godown_id = partner_godown.godown_id; SELECT COUNT(order_id) AS total_orders, SUM(CASE WHEN is_accepted = 0 THEN 1 ELSE 0 END) AS pending_accept, SUM(CASE WHEN is_accepted = 1 THEN 1 ELSE 0 END) AS accepted_orders, SUM(CASE WHEN is_accepted = 2 THEN 1 ELSE 0 END) AS rejected_orders FROM partner_assign;';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).send({ success: false, message: 'Failed to fetch partner assignments', error: err });
    }
    return res.status(200).send({ success: true, message: 'Fetched all partner assignments', data: results });
  });
};


// Get all orders for a partner---
exports.getAllOrdersForAPartner = (req, res) => {
  const { id } = req.params
  const query = 'SELECT partner_assign.order_id, partner_assign.is_accepted, orders.receiver_name, orders.receiver_town, orders.order_status, orders.is_partner_accepted, company_name, full_address, contact_person_name FROM partner_assign INNER JOIN orders ON orders.order_id = partner_assign.order_id INNER JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id INNER JOIN partner_godown ON partner_assign.partner_id = partner_godown.partner_id AND partner_assign.godown_id = partner_godown.godown_id WHERE partner_assign.partner_id = ?; SELECT (SELECT COUNT(order_id) FROM orders WHERE partner_assign_status = 1) AS total, (SELECT COUNT(order_id) FROM orders WHERE partner_assign_status = 1 AND is_partner_accepted = 0) AS pending_acceptance, order_status, COUNT(order_id) AS sum FROM orders GROUP BY order_status;';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).send({ success: false, message: 'Failed to fetch partner assignments', error: err });
    }
    return res.status(200).send({ success: true, message: 'Fetched all partner assignments', data: results });
  });
};



// Get a partner assignment by ID
exports.getPartnerAssignById = (req, res) => {
  const { orderId } = req.params;

  const query = 'SELECT * FROM partner_assign WHERE order_id = ?';
  db.query(query, [orderId], (err, result) => {
    if (err) {
      console.error('Error fetching record:', err);
      return res.status(500).send({ success: false, message: 'Failed to fetch partner assignment', error: err });
    }
    if (result.length === 0) {
      return res.status(404).send({ success: false, message: 'Partner assignment not found' });
    }
    return res.status(200).send({ success: true, message: 'Fetched partner assignment', data: result });
  });
};

// Update a partner assignment
exports.updatePartnerAssign = (req, res) => {
  const { id } = req.params;
  const { partner_id, godown_id, datetime } = req.body;

  const query = 'UPDATE partner_assign SET partner_id = ?, godown_id = ?, datetime = ? WHERE p_assign_id = ?';
  db.query(query, [partner_id, godown_id, datetime, id], (err, result) => {
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

// Update vehicle Assign 
exports.updateVehicleAssign = (req, res) => {
  const { id } = req.params;
  const { vehicle_id, driver_id, msg_for_driver } = req.body;
  console.log(req.body)

  const query = 'UPDATE vehicle_assignment SET vehicle_id = ?, driver_id = ?, msg_for_driver = ? WHERE v_assign_id = ?';
  db.query(query, [vehicle_id, driver_id, msg_for_driver, id], (err, result) => {
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



// ---------------------- 3pl Assigned to orders Controllers ---------------------------



// Add Delivery transit Details
exports.addDeliveryDispatchDetails = (req, res) => {
  const {
    partner_id,
    order_id,
    delivery_godown_address,
    assigned_vehicle_no,
    assigned_driver_name,
    assigned_driver_number,
    e_way_bill_no,
    actual_weight,
    charged_weight,
    partner_amount
  } = req.body;

  const query = `INSERT INTO partner_delivery_details 
    (partner_id, order_id, delivery_godown_address, assigned_vehicle_no, 
    assigned_driver_name, assigned_driver_number, e_way_bill_no, 
    actual_weight, charged_weight, partner_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [
    partner_id,
    order_id,
    delivery_godown_address,
    assigned_vehicle_no,
    assigned_driver_name,
    assigned_driver_number,
    e_way_bill_no,
    actual_weight,
    charged_weight,
    partner_amount
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Failed to add delivery dispatch details' });
    }
    return res.status(200).json({ success: true, message: 'Dispatch details Added Successfully', data: result });
  });
};


// Get Partner Delivery Details by ID
exports.getPartnerDeliveryDetailsById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM partner_delivery_details WHERE partner_assigned_orderid = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch partner delivery details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Partner delivery details not found' });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};


// Delete Partner Delivery Details
exports.deletePartnerDeliveryDetails = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM partner_delivery_details WHERE partner_assigned_orderid = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete partner delivery details' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Partner delivery details not found' });
    }
    res.status(200).json({ success: true });
  });
};


// Update Order Accepted by Partner ---
exports.updateOrderAcceptStatus = (req, res) => {
  const { orderId } = req.params
  const { value, partnerID } = req.body
  const query = `UPDATE partner_assign SET is_accepted = ? WHERE order_id = ? AND partner_id = ?`;

  db.query(query, [value, orderId, partnerID], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Failed to Accept the order' });
    }

    return res.status(200).json({ success: true, message: 'Order Accepted Successfully!' });

  });
}


// Update reason of failed delivery ---
exports.updateDeliveryFailReason = (req, res) => {
  const { id } = req.params
  const query = `UPDATE partner_assign SET reason_of_fail_delivery = ? WHERE order_id = ?`;

  db.query(query, [req.body.text, id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Failed to Upadate the Reason' });
    }

    if (result.changedRows == 0) {
      return res.status(404).json({ success: false, message: 'Order Not Found!' })
    }

         //sending whtsapp msg
         getWhatsappReciverFromDb(id).then((response) => {
          console.log(response)
          sendWhatsAppMsg({
            orderID: id,
            persons: [
              { name: response.receiver_company_name, Number: response.receiver_contact_number },
              { name: response.company_name, Number: response.contact_details }
              ],
            failedReason: req.body.text,
            goods: response.types_of_goods,
            type: 'failedDelivery'
          })
        })

    return res.status(200).json({ success: true, message: 'Reason Updated Successfully!' });
    })
}



// Dispatch order table controllers ---

exports.getOneDispatchOrderDetails = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM partner_delivery_details WHERE order_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).send({ success: false, message: 'Failed to fetch partner assignments', error: err });
    }
    return res.status(200).send({ success: true, message: 'Fetched all partner assignments', data: results });
  });
};


// Update dispatch table controllers ---
exports.updateDispatchDetails = (req, res) => {
  const { id } = req.params
  const {
    partner_id,
    order_id,
    delivery_godown_address,
    assigned_vehicle_no,
    assigned_driver_name,
    assigned_driver_number,
    e_way_bill_no,
    actual_weight,
    charged_weight,
    partner_amount
  } = req.body;

  const query = `
    UPDATE partner_delivery_details SET partner_id = ?, order_id = ?, delivery_godown_address = ?, assigned_vehicle_no = ?, assigned_driver_name = ?, assigned_driver_number = ?, e_way_bill_no = ?, actual_weight = ?, charged_weight = ?, partner_amount = ? WHERE partner_assigned_orderid = ?;
  `;

  try {
    db.query(query, [
      partner_id,
      order_id,
      delivery_godown_address,
      assigned_vehicle_no,
      assigned_driver_name,
      assigned_driver_number,
      e_way_bill_no,
      actual_weight,
      charged_weight,
      partner_amount,
      id
    ], (error, result) => {
      if (error) { throw error; }
      
      return res.status(200).json({ success: true, message: 'Dispatch Details Updated successfully', data: result });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to Update details', error: error.message });
  }
};


// Update Collected Amount ---
exports.updateCollectedAmount = (req, res) => {
  const { id } = req.params
  const query = `UPDATE partner_delivery_details SET collected_amount = ? WHERE order_id = ?`;

  db.query(query, [req.body.collectedAmount, id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Failed to Upadate the Amount' });
    }

    if (result.changedRows == 0) {
      return res.status(404).json({ success: false, message: 'Order Not Found!' })
    }

    return res.status(200).json({ success: true, message: 'Collected Amount Updated Successfully!' });
    })
}







