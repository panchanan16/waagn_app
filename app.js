const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: ['.env.development'] })

require('./config/dbConfig')

const authRoutes = require('./routes/authRoutes')
const pageRouter = require('./routes/pageRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('view engine', ejs)
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser());

// Auth Routes
app.use('/v1/auth', authRoutes)


//page routes
app.use('/', pageRouter)


app.listen(3000, ()=> {
    console.log('App is running on 3000 🚀🚀🚀...')
})