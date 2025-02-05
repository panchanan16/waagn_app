const express = require('express')
const authenticate = require('../middlewares/authenticateAdmin')
const pageRouter = express.Router()



//admin page URLs---

pageRouter.get('/', async (req, res)=> {
    res.render('admin/login.ejs')
})

pageRouter.get('/dashboard', async (req, res)=> {
    res.render('admin/dashboard.ejs')
})

pageRouter.get('/orders', authenticate, async (req, res)=> {
    res.render('admin/orders.ejs')
})

pageRouter.get('/vehicles', async (req, res)=> {
    res.render('admin/vehicles.ejs')
})

pageRouter.get('/drivers', async (req, res)=> {
    res.render('admin/drivers.ejs')
})

pageRouter.get('/our-godowns', async (req, res)=> {
    res.render('admin/ourGodown.ejs')
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

pageRouter.get('/generate-lr', async (req, res)=> {
    res.render('admin/generateLr.ejs')
})

pageRouter.get('/testing', async (req, res)=> {
    res.render('admin/test.ejs')
})



// 3PL Partners PAGES ---

pageRouter.get('/partner-login', async (req, res)=> {
    res.render('partners/login.ejs')
})

pageRouter.get('/partner-dashboard', async (req, res)=> {
    res.render('partners/dashboard.ejs')
})



module.exports = pageRouter