const db = require('../../config/dbConfig');

exports.getDashBoardSummary = (req, res) => {
    const query = 'SELECT COUNT(*) AS totalOrders FROM orders; SELECT COUNT(*) AS active_vehicles FROM vehicle_information WHERE is_active = 1;';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ message: 'Failed to data', success: false });
      }
      return res.status(200).json({ data: results, success: true });
    });
  };