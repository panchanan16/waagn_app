const express = require('express')
const pageRouter = express.Router()



//admin page URLs---

pageRouter.get('/', async (req, res)=> {
    res.render('admin/login.ejs')
})

pageRouter.get('/orders', async (req, res)=> {
    res.render('admin/orders.ejs')
})

pageRouter.get('/vehicles', async (req, res)=> {
    res.render('admin/vehicles.ejs')
})

pageRouter.get('/drivers', async (req, res)=> {
    res.render('admin/drivers.ejs')
})

pageRouter.get('/assign', async (req, res)=> {
    res.render('admin/assign.ejs')
})


pageRouter.get('/partners', async (req, res)=> {
    res.render('admin/partners.ejs')
})

pageRouter.get('/partners-orders', async (req, res)=> {
    res.render('admin/partnerOrders.ejs')
})

pageRouter.get('/calculate-rate', async (req, res)=> {
    res.render('admin/rateCalculator.ejs')
})

pageRouter.get('/testing', async (req, res)=> {
    res.render('admin/test.ejs')
})



module.exports = pageRouter