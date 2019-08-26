const request = require('request');
//const chalk = require('chalk');


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d81ebbeda105e03d8aee204b76285ba3/' + latitude +',' + longitude + '?units=si&lang=en';
    request({ url, json: true }, (error, {body}) => {
        //you either get an error or a response... 1 of the 2
        //the below is (basically) if there's no internet connection
        // console.log(response.body);
        if(error){   callback('ERROR: unable to connect to weather service', undefined);    }
        //this is if there is a connection but the data sent was insuffiecient.
        else if(body.error) {   callback('ERROR: unable to find location. Try again.', undefined);    }
        //print out the good response.
        else
        {
            callback(undefined,`${body.daily.summary}\nIt is currently ${body.currently.temperature} degrees out. \nThere is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}


module.exports = forecast;