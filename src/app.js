const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

// handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Juan Manuel Uribe'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Juan Manuel Uribe'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Solo ingresa tu localidad',
        name: 'Juan Manuel Uribe'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    address = req.query.address;
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send(error)
        }
    
        forecast(longitude, latitude, (error, {temp, feel, desc} = {}) => {
            if(error){
                return res.send(error)
            }
    
            res.send({
                forecast: desc,
                temp,
                feel,
                location,
                address
            })
        })
    })
 
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Juan Manuel Uribe',
        notfoundmsg : 'Help Article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Juan Manuel Uribe',
        notfoundmsg : 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})