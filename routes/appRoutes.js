const express = require('express')
const appRoutes = express.Router()
const driverControllers = require('../controllers/drivers/driverController')
const ordersController = require('../controllers/orders/ordersControllers')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


//drivers api---
appRoutes.post('/driver/register', upload.single('driver_photo'), driverControllers.registerDriver)
appRoutes.get('/driver/getAll', driverControllers.getAllDrivers)
appRoutes.put('/driver/update', driverControllers.updateDriver)


//Orders Api ---

appRoutes.get('/orders', ordersController.getAll);  
// appRoutes.get('/orders/getOne/:id', ordersController.getOne); 
appRoutes.post('/orders', ordersController.create);    
appRoutes.put('/orders/:id', ordersController.update);  // Update an order
appRoutes.delete('/orders/:id', ordersController.delete);

module.exports = appRoutes