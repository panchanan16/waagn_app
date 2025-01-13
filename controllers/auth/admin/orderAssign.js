

function createUserOrderPayment(userData, orderData, paymentData) {
    // Get a connection from the pool
    pool.getConnection(function(err, connection) {
      if (err) {
        console.error('Error getting connection from pool:', err.stack);
        return;
      }
  
      // Start a transaction
      connection.beginTransaction(function(err) {
        if (err) {
          console.error('Error starting transaction:', err.stack);
          connection.release();
          return;
        }
  
        // Insert into users table
        connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [userData.name, userData.email], function(err, userResult) {
          if (err) {
            // If any query fails, rollback the transaction
            return connection.rollback(function() {
              console.error('Error inserting user:', err.stack);
              connection.release();
            });
          }
  
          // Get the userId from the inserted user
          const userId = userResult.insertId;
  
          // Insert into orders table
          connection.query('INSERT INTO orders (user_id, product_name, amount) VALUES (?, ?, ?)', [userId, orderData.product_name, orderData.amount], function(err, orderResult) {
            if (err) {
              // If any query fails, rollback the transaction
              return connection.rollback(function() {
                console.error('Error inserting order:', err.stack);
                connection.release();
              });
            }
  
            // Get the orderId from the inserted order
            const orderId = orderResult.insertId;
  
            // Insert into payments table
            connection.query('INSERT INTO payments (order_id, payment_method, amount_paid) VALUES (?, ?, ?)', [orderId, paymentData.payment_method, paymentData.amount_paid], function(err, paymentResult) {
              if (err) {
                // If any query fails, rollback the transaction
                return connection.rollback(function() {
                  console.error('Error inserting payment:', err.stack);
                  connection.release();
                });
              }
  
              // Commit the transaction if everything is successful
              connection.commit(function(err) {
                if (err) {
                  // If commit fails, rollback the transaction
                  return connection.rollback(function() {
                    console.error('Error committing transaction:', err.stack);
                    connection.release();
                  });
                }
                console.log('Transaction completed successfully.');
                connection.release(); // Release the connection back to the pool
              });
            });
          });
        });
      });
    });
  }
  