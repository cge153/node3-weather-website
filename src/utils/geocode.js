const request = require('request');

const getCoordinates = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibmV1bWFubmNocmlzdCIsImEiOiJja2lya3ZhdGMwY3FtMnNuNDl3Z3lqb3JkIn0.j98DRdhmJ6cDzB9HNCllhg&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Location unknown!', undefined);
        } else {
            const coordinates = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            };
            callback(undefined, coordinates);
        }
    });
};

const getWeather = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dffa7c3dd7e9aace39a4d4b904c0ca9c&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weahter service!', undefined);
        } else if (body.error) {
            callback(`Error from weather service: ${body.error.info}`, undefined);
        } else {
            const weather = {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                icon: body.current.weather_icons[0],
                feelslike: body.current.feelslike
            };
            callback(undefined, weather);
        }
    });
};

module.exports = {
    getCoordinates,
    getWeather
};