const express = require('express')
const authRoutes = express.Router()
const adminAuthControllers = require('../controllers/auth/admin/adminAuth')
const authenticate = require('../middlewares/authenticateAdmin')


//admin auth api---
authRoutes.post('/admin/register', adminAuthControllers.registerAdmin)
authRoutes.post('/admin/login', adminAuthControllers.loginAdmin)
authRoutes.post('/admin/logout', authenticate, adminAuthControllers.adminLogout)

module.exports = authRoutes
