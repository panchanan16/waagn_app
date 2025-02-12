const db = require('../../config/dbConfig');
const sendWhatsAppMsg = require('../../templates/sendWhatsAppMsg');

// GET all orders
exports.getAll = (req, res) => {
  const { interval } = req.query
  const query = `SELECT orders.*, partner_companies.company_name FROM orders LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id WHERE orders.order_date >= CURDATE() - INTERVAL ${interval} DAY ORDER BY orders.order_id DESC; SELECT (SELECT COUNT(*) FROM orders) AS total, order_status, COUNT(order_id) AS sum FROM orders
  GROUP BY order_status;`;

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
  const query = 'SELECT orders.*, partner_companies.company_name, partner_assign.p_assign_id, partner_assign.is_accepted AS partner_accepted, partner_assign.reason_of_fail_delivery, vehicle_information.registration_number, drivers.driver_name, partner_assign.godown_id, partner_godown.full_address, partner_godown.contact_person_name, partner_godown.number AS godown_contact, partner_delivery_details.partner_assigned_orderid AS dispatchId, partner_delivery_details.assigned_vehicle_no AS partner_cart, partner_delivery_details.assigned_driver_name, partner_delivery_details.assigned_driver_number, partner_delivery_details.e_way_bill_no, partner_delivery_details.actual_weight, partner_delivery_details.charged_weight, partner_delivery_details.partner_amount, partner_delivery_details.collected_amount, vehicle_assignment.v_assign_id, vehicle_assignment.vehicle_id, vehicle_assignment.driver_id, vehicle_assignment.msg_for_driver FROM orders LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id LEFT JOIN partner_godown ON partner_godown.godown_id = partner_assign.godown_id LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id LEFT JOIN vehicle_assignment ON vehicle_assignment.order_id = orders.order_id LEFT JOIN drivers ON drivers.driver_id = vehicle_assignment.driver_id LEFT JOIN vehicle_information ON vehicle_information.vehicle_id = vehicle_assignment.vehicle_id LEFT JOIN partner_delivery_details ON partner_delivery_details.order_id = orders.order_id WHERE orders.order_id = ?';

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
    booking_type,
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
      booking_type, pickup_location_address, delivery_location_address, shipper_company_name, shipper_name, 
      shipper_contact_number, shipper_gst, shipper_email_address, shipper_pincode, shipper_town, receiver_company_name, receiver_name, receiver_contact_number, receiver_gst, receiver_email_address, receiver_pincode, receiver_town, types_of_goods, 
      actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box, 
      volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance, 
      tax_invoice_number, payment_mode, payment_status, amount, order_status, order_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    booking_type, pickup_location_address, delivery_location_address, shipper_company_name, shipper_name,
    shipper_contact_number, shipper_gst, shipper_email_address, shipper_pincode, shipper_town, receiver_company_name, receiver_name,
    receiver_contact_number, receiver_gst, receiver_email_address, receiver_pincode, receiver_town, types_of_goods,
    actual_weight_of_consignment, number_of_boxes, length_of_box, height_of_box, breadth_of_box,
    volume_of_consignment, consignment_risk, pickup_datetime, delivery_datetime, insurance,
    tax_invoice_number, payment_mode, payment_status, amount, 'pending', order_date
  ], (err, result) => {
    if (err) {
      // console.error('Error creating order:', err);
      return res.status(500).json({ message: 'Failed to create order', success: false });
    }

    sendWhatsAppMsg({
      orderID: result.insertId,
      orderType: booking_type,
      persons: [{ name: shipper_company_name, Number: shipper_contact_number }, { name: receiver_company_name, Number: receiver_contact_number }],
      goodsDescription: types_of_goods,
      pickLocation: pickup_location_address,
      deliveryLocation: delivery_location_address,
      type: 'orderplaced'
    })
    return res.status(201).json({ message: 'Order created successfully', orderId: result.insertId, success: true });
  });
};

// UPDATE an existing order
exports.update = (req, res) => {
  const { id } = req.params;
  const {
    booking_type,
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
      booking_type = ?, pickup_location_address = ?, delivery_location_address = ?, shipper_company_name = ?, 
      shipper_name = ?, shipper_contact_number = ?, shipper_gst = ?, shipper_email_address = ?, shipper_pincode = ?, shipper_town = ?, receiver_company_name = ?, 
      receiver_name = ?, receiver_contact_number = ?, receiver_gst = ?, receiver_email_address = ?, receiver_pincode = ?, receiver_town = ?,
      types_of_goods = ?, actual_weight_of_consignment = ?, number_of_boxes = ?, length_of_box = ?, 
      height_of_box = ?, breadth_of_box = ?, volume_of_consignment = ?, consignment_risk = ?, 
      pickup_datetime = ?, delivery_datetime = ?, insurance = ?, tax_invoice_number = ?, 
      payment_mode = ?, payment_status = ?, amount = ?, order_date = ?
    WHERE order_id = ?
  `;

  db.query(query, [
    booking_type, pickup_location_address, delivery_location_address, shipper_company_name, shipper_name,
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

  db.query(query, [order_status, orderId], (err, result) => {
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
