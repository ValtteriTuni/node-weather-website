import fetch from 'node-fetch';

const forecast = (lat, long, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=a7b5e7aacc7c75a9caed705aec686951&query=${lat},${long}`;

    fetch(url)
        .then(response => response.json())
        .then(body => {
            if (body.error) {
                console.log('error');
                callback('Unable to find location.', undefined);
            } else {
                callback(undefined, `${body.current.weather_descriptions}. Current temperature ${body.current.temperature}c degrees. Feels like ${body.current.feelslike}c degrees.`);
            }
        })
        .catch(error => {
            callback('Unable to connect to weather service!', undefined);
        });
}

export default forecast;