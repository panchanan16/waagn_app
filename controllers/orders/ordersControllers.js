const db = require('../../config/dbConfig');

// GET all orders
exports.getAll = (req, res) => {
  const query = 'SELECT * FROM orders';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Failed to retrieve orders', success: false });
    }
    return res.status(200).json({ data: results, success: true });
  });
};

// GET all orders
exports.getOne = (req, res) => {
  const { id } = req.params
  const query = 'SELECT orders.order_id, orders.shipper_name, orders.pickup_location_address, orders.delivery_location_address, orders.amount, orders.vehicle_assign_status, orders.partner_assign_status, partner_companies.company_name, partner_assign.p_assign_id, partner_assign.is_accepted AS partner_accepted, vehicle_information.registration_number, drivers.driver_name, partner_assign.godown_id, partner_godown.full_address, partner_godown.contact_person_name, partner_godown.number AS godown_contact, partner_delivery_details.assigned_vehicle_no AS partner_cart, vehicle_assignment.v_assign_id, vehicle_assignment.vehicle_id, vehicle_assignment.driver_id, vehicle_assignment.msg_for_driver FROM orders LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id LEFT JOIN partner_godown ON partner_godown.godown_id = partner_assign.godown_id LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id LEFT JOIN vehicle_assignment ON vehicle_assignment.order_id = orders.order_id LEFT JOIN drivers ON drivers.driver_id = vehicle_assignment.driver_id LEFT JOIN vehicle_information ON vehicle_information.vehicle_id = vehicle_assignment.vehicle_id LEFT JOIN partner_delivery_details ON partner_delivery_details.order_id = orders.order_id WHERE orders.order_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Failed to retrieve the order', success: false });
    }
    return res.status(200).json({ data: results, success: true });
  });
};


exports.getOneForUpdate = (req, res) => {
  const { id } = req.params
  const query = 'SELECT * FROM orders WHERE order_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Failed to retrieve the order', success: false });
    }
    return res.status(200).json({ data: results, success: true });
  });
};

// CREATE a new order
exports.create = (req, res) => {
  const {
    pickup_location_address,
    delivery_location_address,
    shipper_company_name,
    shipper_name,
    shipper_contact_number,
    shipper_email_address,
    receiver_company_name,
    receiver_name,
    receiver_contact_number,
    receiver_gst,
    receiver_email_address,
    types_of_goods,
    actual_weight_of_consignment,
    number_of_boxes,
    length_of_box,
    height_of_box,
    breadth_of_box,
    volume_of_consignment,
    consignment_risk,
    pickup_datetime,
    delivery_datetime,
    insurance,
    tax_invoice_number,
    payment_mode,
    payment_status,
    amount,
    order_date
  } = req.body;

  const query = `
    INSERT INTO orders (
      pickup_location_address, delivery_location_address, shipper_company_name, shipper_name, 
      shipper_contact_number, shipper_email_address, receiver_company_name, receiver_name, 
      receiver_contact_number, receiver_gst, receiver_email_address, types_of_goods, 
      actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box, 
      volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance, 
      tax_invoice_number, payment_mode, payment_status, amount, order_status, order_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    pickup_location_address, delivery_location_address, shipper_company_name, shipper_name,
    shipper_contact_number, shipper_email_address, receiver_company_name, receiver_name,
    receiver_contact_number, receiver_gst, receiver_email_address, types_of_goods,
    actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box,
    volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance,
    tax_invoice_number, payment_mode, payment_status, amount, 'pending', order_date
  ], (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      return res.status(500).json({ message: 'Failed to create order', success: false });
    }
    return res.status(201).json({ message: 'Order created successfully', orderId: result.insertId, success: true });
  });
};

// UPDATE an existing order
exports.update = (req, res) => {
  const orderId = req.params.id;
  const {
    pickup_location_address,
    delivery_location_address,
    shipper_company_name,
    shipper_name,
    shipper_contact_number,
    shipper_email_address,
    receiver_company_name,
    receiver_name,
    receiver_contact_number,
    receiver_gst,
    receiver_email_address,
    types_of_goods,
    actual_weight_of_consignment,
    number_of_boxes,
    length_of_box,
    height_of_box,
    breadth_of_box,
    volume_of_consignment,
    consignment_risk,
    pickup_datetime,
    delivery_datetime,
    insurance,
    tax_invoice_number,
    payment_mode,
    payment_status,
    amount,
    order_status
  } = req.body;

  const query = `
    UPDATE orders SET
      pickup_location_address = ?, delivery_location_address = ?, shipper_company_name = ?, 
      shipper_name = ?, shipper_contact_number = ?, shipper_email_address = ?, receiver_company_name = ?, 
      receiver_name = ?, receiver_contact_number = ?, receiver_gst = ?, receiver_email_address = ?, 
      types_of_goods = ?, actual_weight_of_consignment = ?, number_of_boxes = ?, length_of_box = ?, 
      height_of_box = ?, breadth_of_box = ?, volume_of_consignment = ?, consignment_risk = ?, 
      pickup_datetime = ?, delivery_datetime = ?, insurance = ?, tax_invoice_number = ?, 
      payment_mode = ?, payment_status = ?, amount = ?, order_status = ?
    WHERE order_id = ?
  `;

  db.query(query, [
    pickup_location_address, delivery_location_address, shipper_company_name, shipper_name,
    shipper_contact_number, shipper_email_address, receiver_company_name, receiver_name,
    receiver_contact_number, receiver_gst, receiver_email_address, types_of_goods,
    actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box,
    volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance,
    tax_invoice_number, payment_mode, payment_status, amount, order_status, orderId
  ], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      return res.status(500).json({ message: 'Failed to update order', success: false });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found', success: false });
    }
    return res.status(200).json({ message: 'Order updated successfully', success: true });
  });
};


// UPDATE an existing order status ---
exports.updateOrderStatus = (req, res) => {
  const orderId = req.params.orderId;
  const { order_status } = req.body;

  const query = `UPDATE orders SET order_status = ? WHERE order_id = ?`;

  db.query(query, [order_status, orderId ], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      return res.status(500).json({ message: 'Failed to update order', success: false });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found', success: false });
    }
    return res.status(200).json({ message: 'Order Status Updated successfully', success: true });
  });
};

// DELETE an order by ID
exports.delete = (req, res) => {
  const orderId = req.params.id;
  const query = 'DELETE FROM orders WHERE order_id = ?';

  db.query(query, [orderId], (err, result) => {
    if (err) {
      console.error('Error deleting order:', err);
      return res.status(500).json({ message: 'Failed to delete order', success: false });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found', success: false });
    }
    return res.status(200).json({ message: 'Order deleted successfully', success: true });
  });
};
