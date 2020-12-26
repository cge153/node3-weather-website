const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { getCoordinates, getWeather } = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// The first match of the route is served to the client!
app.get('', (req, res) => {   // index.hbs needs to be in the "views" directory, if not specified otherwise!
    res.render('index', {
        title: 'Weather',
        name: 'Christoph Neumann'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Christoph Neumann'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Christoph Neumann',
        message: 'This is supposed to be a helpfule message.'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    getCoordinates(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        getWeather(longitude, latitude, (error, { description, temperature, icon, feelslike } = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                temperature,
                description,
                icon,
                feelslike,
                location,
                address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christoph Neumann',
        error: 'Help article not found.'
    });
});

// This applies to all routes that have not been defined above.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christoph Neumann',
        error: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
