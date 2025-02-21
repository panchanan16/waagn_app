const db = require('../config/dbConfig')

function getWhatsappReciverFromDb(orderId) { 
    return new Promise((resolve, reject) => {
        const query = `SELECT orders.shipper_company_name, orders.shipper_contact_number, orders.receiver_company_name, orders.receiver_contact_number, partner_companies.company_name FROM orders 
        LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id
        LEFT JOIN partner_companies ON partner_assign.partner_id = partner_companies.company_id
        WHERE orders.order_id = ?`
        db.query(query, [orderId], (err, result) => {
            if (err) { reject(err); 
            } else { resolve(result[0]); }
        })

      });
}

//getWhatsappRecieverDb
module.exports = getWhatsappReciverFromDb
