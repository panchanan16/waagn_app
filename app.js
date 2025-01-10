const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
require('dotenv').config({ path: ['.env.development'] })

require('./config/dbConfig')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.send('Welcome to Waagn App 🚛🚛🚛')
})


app.listen(3000, ()=> {
    console.log('App is running on 3000 🚀🚀🚀...')
})