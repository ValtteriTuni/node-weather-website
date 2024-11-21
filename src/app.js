import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';
// app
const app = express();

// Define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engige and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirPath));

// index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Valtteri Laakso'
    });
});

// about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Valtteri Laakso'
    });
});

// Weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

//help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'help me!',
        title: 'Help',
        name: 'Valtteri Laakso'
    })
});

// help*
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Valtteri Laakso',
        errorMessage: 'Help article not found'
    })
});

// products
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

// *
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Valtteri Laakso',
        errorMessage: 'Page not found'
    })
});

// listen
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});