const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enginge and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mazinger Z'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mazinger Z'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'We are here to help',
        name: 'Mazinger Z'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
           error: 'You must provide an address'
       })
   }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (error) {
                return res.send({ forecastError })
            }

            res.send({
                location,
                forecast: forecastData
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

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: ' Help article not found',
        title: '404',
        name: 'Mazinger Z'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: ' Page not found',
        title: '404',
        name: 'Mazinger Z'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})