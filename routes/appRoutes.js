const express = require('express')
const appRoutes = express.Router()
const adminAuthControllers = require('../controllers/auth/admin/adminAuth')


//admin auth api---
authRoutes.post('/admin/register', adminAuthControllers.registerAdmin)
authRoutes.post('/admin/login', adminAuthControllers.loginAdmin)

module.exports = authRoutes