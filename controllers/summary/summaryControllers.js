const db = require('../../config/dbConfig');

exports.getDashBoardSummary = (req, res) => {
    const query = `SELECT COUNT(order_id) AS total, order_status, (SELECT COUNT(*) FROM orders) AS total_orders FROM orders GROUP BY order_status; SELECT COUNT(*) AS active_vehicles FROM vehicle_information WHERE is_active = 1;`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ message: 'Failed to data', success: false });
      }
      return res.status(200).json({ data: results, success: true });
    });
  };