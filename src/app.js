const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require ( './utils/forecast')

const app = express()
const port = process.env.PORT  || 3000



// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    
    const location = req.query.adress
    if(!location){
        return res.send(  { 
            error : 'there is no adress '
        } )
    }

/**/ 

    geocode(location,(error,data)=>{ // agar data ro destructure kunim bayad meghdar {} bedim 
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude , (error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            //console.log(forecastData)
            res.send({
                error : error ,
                weather :forecastData , // .main migereftim azash 
                location : data.location 
            })

        })
        
        
    })

    // res.send({

    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     adress : location
    // })
})
app.get('/pros', (req, res) => {  // agar bala mineveshtim kar nemikar !!!  /*inja */

    if ( !req.query.address){
        return res.send({
            error: 'provide address'
        })

    }
    const adres =  req.query.address
    console.log(req.query.address)
    res.send ({
       location  : adres, 
       tem : '8'

    })

})
app.get('/products', (req, res) => {
    if (!req.query.search) { // query. harchi bade noghte bashe hamoon bayad type she dar url 
        return res.send({  // این ریتارن باعث میشه تابع تموم شه اجراش 
           // >>> اگر ریتارن نبود کنسول پایین ارور میداد چون ریکوعست آندیفاین میشد 
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search) // >>> اینجا
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + port)
}) // gkjhb