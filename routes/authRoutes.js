const express = require('express')
const authRoutes = express.Router()
const adminAuthControllers = require('../controllers/auth/admin/adminAuth')
const partnerAuthControllers =  require('../controllers/auth/partners/partnerAuth')
const authenticate = require('../middlewares/authenticateAdmin')


//admin auth api---
authRoutes.post('/admin/register', adminAuthControllers.registerAdmin)
authRoutes.post('/admin/login', adminAuthControllers.loginAdmin)
authRoutes.post('/admin/logout', authenticate, adminAuthControllers.adminLogout)



//partner auth api---
authRoutes.post('/user/register', partnerAuthControllers.createuser)

module.exports = authRoutes
