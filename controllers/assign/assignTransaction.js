const db = require('../../config/dbConfig');
const sendWhatsAppMsg = require('../../templates/sendWhatsAppMsg');

async function partnerAssign_StatusUpdate(req, res) {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db: ' + err.stack);
      return;
    }

    //Start a transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction: ' + err.stack);
        connection.release();
        return res.status(500).json({ success: false, message: "Error in database server" });
      }

      const { order_id, partner_id, godown_id } = req.body;

      const assignQuery = 'INSERT INTO partner_assign (order_id, partner_id, godown_id) VALUES (?, ?, ?)';
      connection.query(assignQuery, [order_id, partner_id, godown_id], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error executing query: ' + err.stack);
            connection.release();
            return res.status(500).send({ success: false, message: 'Failed to create partner assignment', error: err });
          });
        }


        // 2nd transaction ---
        const statusQuery = `UPDATE orders SET partner_assign_status = ? WHERE order_id = ?`;
        connection.query(statusQuery, [1, order_id], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error updating status: ' + err.stack);
              connection.release();
              return res.status(500).send({ success: false, message: 'Failed to update Status', error: err });
            });
          }

          //Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error('Error committing transaction: ' + err.stack);
                connection.release();
                return res.status(500).send({ success: false, message: 'Committing Error', error: err });
              });
            }
            connection.release();
            return res.status(201).send({ success: true, message: 'Partner assigned successfully', data: result });
          });
        });
      });
    });
  });
}


async function vehicleAssign_StatusUpdate(req, res) {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db: ' + err.stack);
      return;
    }

    //Start a transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction: ' + err.stack);
        connection.release();
        return res.status(500).json({ success: false, message: "Error in database server" });
      }

      const { order_id, vehicle_id, driver_id, msg_for_driver } = req.body;

      const assignQuery = 'INSERT INTO vehicle_assignment (order_id, vehicle_id, driver_id, msg_for_driver) VALUES (?, ?, ?, ?)';
      connection.query(assignQuery, [order_id, vehicle_id, driver_id, msg_for_driver], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error executing query: ' + err.stack);
            connection.release();
            return res.status(500).send({ success: false, message: 'Failed vehicle assignment', error: err });
          });
        }


        // 2nd transaction ---
        const statusQuery = `UPDATE orders SET vehicle_assign_status = ? WHERE order_id = ?`;
        connection.query(statusQuery, [1, order_id], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error updating status: ' + err.stack);
              connection.release();
              return res.status(500).send({ success: false, message: 'Failed to update Status', error: err });
            });
          }

          //Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error('Error committing transaction: ' + err.stack);
                connection.release();
                return res.status(500).send({ success: false, message: 'Committing Error', error: err });
              });
            }
            connection.release();
            return res.status(200).send({ success: true, message: 'Vehicle assigned successfully', data: result });
          });
        });
      });
    });
  });
}


async function dispatch_StatusUpdate(req, res) {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db: ' + err.stack);
      return;
    }

    //Start a transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction: ' + err.stack);
        connection.release();
        return res.status(500).json({ success: false, message: "Error in database server" });
      }

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

      const assignQuery = 'INSERT INTO partner_delivery_details (partner_id, order_id, delivery_godown_address,assigned_vehicle_no, assigned_driver_name, assigned_driver_number, e_way_bill_no, actual_weight, charged_weight, partner_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(assignQuery, [
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
          return connection.rollback(() => {
            console.error('Error executing query: ' + err.stack);
            connection.release();
            return res.status(500).send({ success: false, message: 'Failed dispatch assignment', error: err });
          });
        }


        //2nd transaction ---
        const statusQuery = `UPDATE orders SET order_status = ? WHERE order_id = ?`;
        connection.query(statusQuery, ['outfordelivery', order_id], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error updating status: ' + err.stack);
              connection.release();
              return res.status(500).send({ success: false, message: 'Failed to update dispatch Status', error: err });
            });
          }

          const msgInquiry = `SELECT * FROM orders WHERE order_id = ?`
          connection.query(msgInquiry, [order_id], (err, result) => {
            if (!err) {
              sendWhatsAppMsg({
                orderID: order_id,
                persons: [{ name: result[0].receiver_company_name, Number: result[0].receiver_contact_number }],
                goodsDescription: result[0].types_of_goods,
                deliveryPerson: assigned_driver_name,
                agentContact: assigned_driver_number,
                type: 'outfordelivery'
              })
            }
          })


          //Commit the transaction ---
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error('Error committing transaction: ' + err.stack);
                connection.release();
                return res.status(500).send({ success: false, message: 'Committing Error', error: err });
              });
            }
            connection.release();
            return res.status(200).send({ success: true, message: 'Dispatch successfully', data: result });
          });
        });
      });
    });
  });
}

module.exports = {
  partnerAssign_StatusUpdate,
  vehicleAssign_StatusUpdate,
  dispatch_StatusUpdate
}