const express = require('express')
const pageRouter = express.Router()



//admin auth api---

pageRouter.get('/', async (req, res)=> {
    res.render('admin/index.ejs')
})

pageRouter.get('/drivers', async (req, res)=> {
    res.render('admin/drivers.ejs')
})

pageRouter.get('/testing', async (req, res)=> {
    res.render('admin/test.ejs')
})



module.exports = pageRouter