const express = require('express')
const appRoutes = express.Router()
const driverControllers = require('../controllers/drivers/driverController')
const ordersController = require('../controllers/orders/ordersControllers')
const partnerController  = require('../controllers/partner/partnerControllers')
const vehicleControllers = require('../controllers/vehicles/vehiclesController')
const assignControllers = require('../controllers/assign/assignController')
const ourGodownControllers = require('../controllers/godowns/ourGodownControllers')
const summaryControllers = require('../controllers/summary/summaryControllers')
const complaintControllers = require('../controllers/complaint/complaintControllers')

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
appRoutes.get('/vehicle/:id', vehicleControllers.getOneVehicle)
appRoutes.get('/vehicles', vehicleControllers.getAllVehicles)
appRoutes.put('/vehicle/:id', vehicleControllers.updateVehicle)
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
appRoutes.put('/partner/status/:id', partnerController.updatePartnerStatus);
appRoutes.delete('/partner/:id', partnerController.deletePartnerCompany);


//Partners godown Api ---
appRoutes.get('/godown/:id', partnerController.getAllGodown);  
appRoutes.get('/godowns/:id/:type', partnerController.getAllGodownForDropdown);  
appRoutes.post('/godown', partnerController.createGodown);    
appRoutes.put('/godown/:id', partnerController.updatePartnerGodown);
appRoutes.delete('/godown/:gid/partner/:pid', partnerController.deletePartnerGodown);

//Our godown Api ---
appRoutes.post('/ourgodown', ourGodownControllers.createOurGodown);    
appRoutes.get('/ourgodowns', ourGodownControllers.getAllGodowns);  
appRoutes.get('/ourgodown/:id', ourGodownControllers.getOneGodown);
appRoutes.put('/ourgodown/status/:id', ourGodownControllers.updateOurGodownStatus); 
appRoutes.put('/ourgodown/:id', ourGodownControllers.updateOurGodown); 


//Partners Assign Api ---
appRoutes.get('/assign/partners', assignControllers.getAllPartnerAssigns); 
appRoutes.get('/assign/orders/:id', assignControllers.getAllOrdersForAPartner); 
appRoutes.get('/assign/partner/:orderId', assignControllers.getPartnerAssignById); 
appRoutes.post('/assign/partner', assignTransactions.partnerAssign_StatusUpdate);    
appRoutes.put('/assign/partner/:id', assignControllers.updatePartnerAssign);
appRoutes.put('/assign/partner/status/:orderId', assignControllers.updateOrderAcceptStatus);
appRoutes.put('/assign/partner/fail/:id', assignControllers.updateDeliveryFailReason);


//Vehicles Assign Api --- 
appRoutes.post('/assign/vehicle', assignTransactions.vehicleAssign_StatusUpdate);    
appRoutes.put('/assign/vehicle/:id', assignControllers.updateVehicleAssign);


//Delivery Dispatch Api ---
appRoutes.post('/dispatch', assignTransactions.dispatch_StatusUpdate);  
appRoutes.get('/dispatch/:id', assignControllers.getOneDispatchOrderDetails); 
appRoutes.put('/dispatch/:id', assignControllers.updateDispatchDetails); 
appRoutes.put('/dispatch/amount/:id', assignControllers.updateCollectedAmount); 


// Dashboard API ---
appRoutes.get('/dashboard/data', summaryControllers.getDashBoardSummary); 

// Raise complaint API --
appRoutes.post('/compaint', complaintControllers.createComplaint)
appRoutes.get('/compaints', complaintControllers.getAllComplaints); 
appRoutes.get('/compaint/:id', complaintControllers.getOneComplaint); 
appRoutes.delete('/compaint/:id', complaintControllers.deleteComplaint)


module.exports = appRoutes