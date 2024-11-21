import fetch from 'node-fetch';

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmFsdHRlcmlsYWFrc28xIiwiYSI6ImNtM242Z2t1YjE0M3MycXF6dzdtdjJ2MjUifQ.IbJDep0zqiCsIL7YW8znqQ&limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(body => {
            if (body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined);
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        })
        .catch(error => {
            callback('Unable to connect to location services!', undefined);
        });
};

export default geocode;