const express = require('express')
const appRoutes = express.Router()
const driverControllers = require('../controllers/drivers/driverController')
const ordersController = require('../controllers/orders/ordersControllers')
const partnerController  = require('../controllers/partner/partnerControllers')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


//Drivers api---
appRoutes.post('/driver/register', upload.single('driver_photo'), driverControllers.registerDriver)
appRoutes.get('/driver/getAll', driverControllers.getAllDrivers)
appRoutes.put('/driver/update', driverControllers.updateDriver)


//Orders Api ---

appRoutes.get('/orders', ordersController.getAll);  
// appRoutes.get('/orders/getOne/:id', ordersController.getOne); 
appRoutes.post('/orders', ordersController.create);    
appRoutes.put('/orders/:id', ordersController.update);  // Update an order
appRoutes.delete('/orders/:id', ordersController.delete);


//Partners Api ---
appRoutes.get('/partners', partnerController.getAllPartnerCompanies);  
appRoutes.get('/partner/getOne/:id', partnerController.getPartnerCompanyById); 
appRoutes.post('/partner', partnerController.createPartnerCompany);    
appRoutes.put('/partner/:id', partnerController.updatePartnerCompany);
appRoutes.delete('/partner/:id', partnerController.deletePartnerCompany);


//Partners godown Api ---
appRoutes.get('/godowns', partnerController.getAllGodown);  
appRoutes.post('/godown', partnerController.createGodown);    
appRoutes.put('/godown/:id', partnerController.updatePartnerGodown);

module.exports = appRoutes