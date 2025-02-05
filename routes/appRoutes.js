const express = require('express')
const appRoutes = express.Router()
const driverControllers = require('../controllers/drivers/driverController')
const ordersController = require('../controllers/orders/ordersControllers')
const partnerController  = require('../controllers/partner/partnerControllers')
const vehicleControllers = require('../controllers/vehicles/vehiclesController')
const assignControllers = require('../controllers/assign/assignController')
const ourGodownControllers = require('../controllers/godowns/ourGodownControllers')
const summaryControllers = require('../controllers/summary/summaryControllers')

// Transactions ---
const assignTransactions = require('../controllers/assign/assignTransaction')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


//Drivers Api ---
appRoutes.post('/driver/register', upload.single('driver_photo'), driverControllers.registerDriver)
appRoutes.get('/drivers', driverControllers.getAllDrivers)
appRoutes.get('/driver/:id', driverControllers.getOneDriver)
appRoutes.get('/drivers/drop', driverControllers.getAllDriversForDropdown)
appRoutes.put('/driver/update', driverControllers.updateDriver)
appRoutes.put('/driver/status/:id', driverControllers.updateDriverStatus)


//Vehicles Api ---
appRoutes.post('/vehicle', vehicleControllers.createVehicle)
appRoutes.get('/vehicles', vehicleControllers.getAllVehicles)
appRoutes.put('/vehicle', vehicleControllers.updateVehicle)
appRoutes.put('/vehicle/status/:id', vehicleControllers.updateVehicleStatus)
appRoutes.get('/vehicles/drivers', vehicleControllers.getAllVehiclesWithDriver)


//Orders Api ---
appRoutes.get('/orders', ordersController.getAll);  
appRoutes.get('/order/:id', ordersController.getOne); 
appRoutes.get('/order/update/:id', ordersController.getOneForUpdate); 
appRoutes.post('/order', ordersController.create); 
appRoutes.put('/order/status/:orderId', ordersController.updateOrderStatus);   
appRoutes.put('/order/:id', ordersController.update);
appRoutes.delete('/order/:id', ordersController.delete);


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

//Our godown Api ---
appRoutes.post('/ourgodown', ourGodownControllers.createGodown);    
appRoutes.get('/ourgodowns', ourGodownControllers.getAllGodown);  
appRoutes.get('/ourgodown/:id', ourGodownControllers.getOneGodown);


//Partners Assign Api ---
appRoutes.get('/assign/partners', assignControllers.getAllPartnerAssigns); 
appRoutes.get('/assign/partner/:orderId', assignControllers.getPartnerAssignById); 
appRoutes.post('/assign/partner', assignTransactions.partnerAssign_StatusUpdate);    
appRoutes.put('/assign/partner/:id', assignControllers.updatePartnerAssign);
appRoutes.put('/assign/partner/status/:orderId', assignControllers.updateOrderAcceptStatus);


//Vehicles Assign Api --- 
appRoutes.post('/assign/vehicle', assignTransactions.vehicleAssign_StatusUpdate);    
appRoutes.put('/assign/vehicle/:id', assignControllers.updateVehicleAssign);


//Delivery Dispatch Api ---
appRoutes.post('/dispatch', assignTransactions.dispatch_StatusUpdate);  
appRoutes.get('/dispatch/:id', assignControllers.getOneDispatchOrderDetails); 


// Dashboard API

appRoutes.get('/dashboard/data', summaryControllers.getDashBoardSummary);  

module.exports = appRoutes