const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mitchell Goodwin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mitchell Goodwin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Here's the help page dumb dumbs",
        title: 'Help Page',
        name: 'Mitchell Goodwin' 
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, location, longitude } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
    
            res.send({
                location,
                forecast: forecastData.forecast,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: "Help article not found",
        title: '404',
        name: 'Mitchell Goodwin' 
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: "Page not found",
        title: '404',
        name: 'Mitchell Goodwin' 
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})