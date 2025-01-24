const express = require('express')
const appRoutes = express.Router()
const driverControllers = require('../controllers/drivers/driverController')
const ordersController = require('../controllers/orders/ordersControllers')
const partnerController  = require('../controllers/partner/partnerControllers')
const vehicleControllers = require('../controllers/vehicles/vehiclesController')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


//Drivers Api ---
appRoutes.post('/driver/register', upload.single('driver_photo'), driverControllers.registerDriver)
appRoutes.get('/drivers', driverControllers.getAllDrivers)
appRoutes.get('/drivers/drop', driverControllers.getAllDriversForDropdown)
appRoutes.put('/driver/update', driverControllers.updateDriver)


//Vehicles Api ---
appRoutes.post('/vehicle', vehicleControllers.createVehicle)
appRoutes.get('/vehicles', vehicleControllers.getAllVehicles)
appRoutes.put('/vehicle', vehicleControllers.updateVehicle)


//Orders Api ---
appRoutes.get('/orders', ordersController.getAll);  
// appRoutes.get('/orders/getOne/:id', ordersController.getOne); 
appRoutes.post('/orders', ordersController.create);    
appRoutes.put('/orders/:id', ordersController.update);  // Update an order
appRoutes.delete('/orders/:id', ordersController.delete);


//Partners Api ---
appRoutes.get('/partners', partnerController.getAllPartnerCompanies);  
appRoutes.get('/partner/:partner_id', partnerController.getPartnerCompanyById); 
appRoutes.get('/partners/drop', partnerController.getAllPartnerCompaniesForDropdown); 
appRoutes.post('/partner', partnerController.createPartnerCompany);    
appRoutes.put('/partner/:id', partnerController.updatePartnerCompany);
appRoutes.delete('/partner/:id', partnerController.deletePartnerCompany);


//Partners godown Api ---
appRoutes.get('/godown/:id', partnerController.getAllGodown);  
appRoutes.get('/godowns/:id/:type', partnerController.getAllGodownForDropdown);  
appRoutes.post('/godown', partnerController.createGodown);    
appRoutes.put('/godown/:id', partnerController.updatePartnerGodown);

module.exports = appRoutes