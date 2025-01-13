const express = require('express')
const pageRouter = express.Router()



//admin page URLs---

pageRouter.get('/', async (req, res)=> {
    res.render('admin/index.ejs')
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

pageRouter.get('/testing', async (req, res)=> {
    res.render('admin/test.ejs')
})



module.exports = pageRouter