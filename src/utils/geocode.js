const request = require('request');



const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFya2Ntb29yZSIsImEiOiJjanpqMm83aXIwNW03M2NxdHh4MW10NW1jIn0.6jI-1xOIxbuIYuwLl7ma-w&limit=1';

    request( {url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location service', undefined);
        }else if(body.features.length === 0){
            callback('unable to find location. Try again.', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode