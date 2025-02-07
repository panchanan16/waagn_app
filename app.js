const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const compression = require('compression')
require('dotenv').config({ path: [`.env.${process.env.NODE_ENV}`] })

require('./config/dbConfig')

const authRoutes = require('./routes/authRoutes')
const pageRouter = require('./routes/pageRoutes')
const appRoutes = require('./routes/appRoutes')
const transactionRoute = require('./routes/transactionRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('view engine', ejs)
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser());
app.use(compression())

// Auth Routes
app.use('/v1/auth', authRoutes)


//App Routes
app.use('/v1', appRoutes)


//transactions routee
app.use('/v1', transactionRoute)



//page routes
app.use('/', pageRouter)


app.listen(3000, ()=> {
    console.log('App is running on http://localhost:3000/ 🚀🚀🚀...')
})