const express = require('express')
const transactionRoute = express.Router()
const orderTransactionControllers = require('../controllers/auth/admin/adminAuth')


//admin auth api---
transactionRoute.post('/admin/register', orderTransactionControllers.registerAdmin)
transactionRoute.post('/admin/login', orderTransactionControllers.loginAdmin)

module.exports = transactionRoute
