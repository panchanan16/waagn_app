const db = require('../../config/dbConfig');

// GET all orders
exports.getAll = (req, res) => {
  const query = 'SELECT orders.*, partner_companies.company_name FROM orders LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id;';

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
  const query = 'SELECT orders.order_id, orders.shipper_name, orders.shipper_company_name, orders.shipper_contact_number, orders.shipper_gst, orders.shipper_email_address, orders.shipper_pincode, orders.shipper_town, orders.pickup_location_address, orders.delivery_location_address, orders.amount, orders.payment_mode, orders.payment_status, orders.shipper_company_name, orders.receiver_company_name, orders.receiver_name, orders.receiver_contact_number, orders.receiver_gst, orders.receiver_email_address, orders.receiver_pincode, orders.receiver_town, orders.vehicle_assign_status, orders.order_status, orders.partner_assign_status, orders.is_partner_accepted, orders.order_date, orders.is_partner_accepted, orders.length_of_box, orders.height_of_box, orders.breadth_of_box, orders.volume_of_consignment, orders.actual_weight_of_consignment, orders.number_of_boxes, orders.types_of_goods, orders.consignment_risk, orders.insurance, orders.tax_invoice_number, partner_companies.company_name, partner_assign.p_assign_id, partner_assign.is_accepted AS partner_accepted, partner_assign.reason_of_fail_delivery, vehicle_information.registration_number, drivers.driver_name, partner_assign.godown_id, partner_godown.full_address, partner_godown.contact_person_name, partner_godown.number AS godown_contact, partner_delivery_details.partner_assigned_orderid AS dispatchId, partner_delivery_details.assigned_vehicle_no AS partner_cart, partner_delivery_details.assigned_driver_name, partner_delivery_details.assigned_driver_number, partner_delivery_details.e_way_bill_no, partner_delivery_details.actual_weight, partner_delivery_details.charged_weight, partner_delivery_details.partner_amount, partner_delivery_details.collected_amount, vehicle_assignment.v_assign_id, vehicle_assignment.vehicle_id, vehicle_assignment.driver_id, vehicle_assignment.msg_for_driver FROM orders LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id LEFT JOIN partner_godown ON partner_godown.godown_id = partner_assign.godown_id LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id LEFT JOIN vehicle_assignment ON vehicle_assignment.order_id = orders.order_id LEFT JOIN drivers ON drivers.driver_id = vehicle_assignment.driver_id LEFT JOIN vehicle_information ON vehicle_information.vehicle_id = vehicle_assignment.vehicle_id LEFT JOIN partner_delivery_details ON partner_delivery_details.order_id = orders.order_id WHERE orders.order_id = ?';

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
    shipper_gst,
    shipper_email_address,
    shipper_pincode,
    shipper_town,
    receiver_company_name,
    receiver_name,
    receiver_contact_number,
    receiver_gst,
    receiver_email_address,
    receiver_pincode,
    receiver_town,
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
      shipper_contact_number, shipper_gst, shipper_email_address, shipper_pincode, shipper_town, receiver_company_name, receiver_name, receiver_contact_number, receiver_gst, receiver_email_address, receiver_pincode, receiver_town, types_of_goods, 
      actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box, 
      volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance, 
      tax_invoice_number, payment_mode, payment_status, amount, order_status, order_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    pickup_location_address, delivery_location_address, shipper_company_name, shipper_name,
    shipper_contact_number, shipper_gst, shipper_email_address, shipper_pincode, shipper_town, receiver_company_name, receiver_name,
    receiver_contact_number, receiver_gst, receiver_email_address, receiver_pincode, receiver_town, types_of_goods,
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
  const {id} = req.params;
  const {
    pickup_location_address,
    delivery_location_address,
    shipper_company_name,
    shipper_name,
    shipper_contact_number,
    shipper_gst,
    shipper_email_address,
    shipper_pincode,
    shipper_town,
    receiver_company_name,
    receiver_name,
    receiver_contact_number,
    receiver_gst,
    receiver_email_address,
    receiver_pincode,
    receiver_town,
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
    UPDATE orders SET
      pickup_location_address = ?, delivery_location_address = ?, shipper_company_name = ?, 
      shipper_name = ?, shipper_contact_number = ?, shipper_gst = ?, shipper_email_address = ?, shipper_pincode = ?, shipper_town = ?, receiver_company_name = ?, 
      receiver_name = ?, receiver_contact_number = ?, receiver_gst = ?, receiver_email_address = ?, receiver_pincode = ?, receiver_town = ?,
      types_of_goods = ?, actual_weight_of_consignment = ?, number_of_boxes = ?, length_of_box = ?, 
      height_of_box = ?, breadth_of_box = ?, volume_of_consignment = ?, consignment_risk = ?, 
      pickup_datetime = ?, delivery_datetime = ?, insurance = ?, tax_invoice_number = ?, 
      payment_mode = ?, payment_status = ?, amount = ?, order_date = ?
    WHERE order_id = ?
  `;

  db.query(query, [
    pickup_location_address, delivery_location_address, shipper_company_name, shipper_name,
    shipper_contact_number, shipper_gst, shipper_email_address, shipper_pincode, shipper_town, receiver_company_name, receiver_name,
    receiver_contact_number, receiver_gst, receiver_email_address, receiver_pincode, receiver_town, types_of_goods,
    actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box,
    volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance,
    tax_invoice_number, payment_mode, payment_status, amount, order_date, id
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
