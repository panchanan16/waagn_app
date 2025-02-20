const express = require('express')
const serverSideRoutes = express.Router()
const db = require('../config/dbConfig');


serverSideRoutes.get('/download-order-details', async (req, res) => {
    const { order } = req.query;
    const query = 'SELECT orders.*, partner_companies.company_name, partner_assign.p_assign_id, partner_assign.is_accepted AS partner_accepted, partner_assign.reason_of_fail_delivery, vehicle_information.registration_number, drivers.driver_name, partner_assign.godown_id, partner_godown.full_address, partner_godown.contact_person_name, partner_godown.number AS godown_contact, partner_delivery_details.partner_assigned_orderid AS dispatchId, partner_delivery_details.assigned_vehicle_no AS partner_cart, partner_delivery_details.assigned_driver_name, partner_delivery_details.assigned_driver_number, partner_delivery_details.e_way_bill_no, partner_delivery_details.actual_weight, partner_delivery_details.charged_weight, partner_delivery_details.partner_amount, partner_delivery_details.collected_amount, vehicle_assignment.v_assign_id, vehicle_assignment.vehicle_id, vehicle_assignment.driver_id, vehicle_assignment.msg_for_driver FROM orders LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id LEFT JOIN partner_godown ON partner_godown.godown_id = partner_assign.godown_id LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id LEFT JOIN vehicle_assignment ON vehicle_assignment.order_id = orders.order_id LEFT JOIN drivers ON drivers.driver_id = vehicle_assignment.driver_id LEFT JOIN vehicle_information ON vehicle_information.vehicle_id = vehicle_assignment.vehicle_id LEFT JOIN partner_delivery_details ON partner_delivery_details.order_id = orders.order_id WHERE orders.order_id = ?';

    db.query(query, [order], (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ message: 'Failed to retrieve the order', success: false });
        }
        return res.render('admin/downloadOrderDetails.ejs', {data: results[0]})
    });
   
})


module.exports = serverSideRoutes;