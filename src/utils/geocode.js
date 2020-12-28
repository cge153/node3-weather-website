const request = require('request');

const getCoordinates = (token, location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}&limit=1`;
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

const getWeather = (token, longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${token}&query=${latitude},${longitude}`;
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
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            };
            callback(undefined, weather);
        }
    });
};

module.exports = {
    getCoordinates,
    getWeather
};