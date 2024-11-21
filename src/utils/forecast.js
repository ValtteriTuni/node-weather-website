import fetch from 'node-fetch';

const forecast = (lat, long, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=a7b5e7aacc7c75a9caed705aec686951&query=${lat},${long}`;

    fetch(url)
        .then(response => response.json())
        .then(body => {
            if (body.error) {
                callback('Unable to find location.', undefined);
            } else {
                callback(undefined, `Current temperature ${body.current.temperature} degrees. Feels like ${body.current.feelslike} degrees.`);
            }
        })
        .catch(error => {
            callback('Unable to connect to weather service!', undefined);
        });
}

export default forecast;