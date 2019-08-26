const request = require('request');
//const chalk = require('chalk');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d81ebbeda105e03d8aee204b76285ba3/${latitude},${longitude}?units=si&lang=en`;

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
            // console.log(body);
            const dateSR = new Date(body.daily.data[0].sunriseTime*1000);
            const hoursSR = dateSR.getHours();
            // Minutes part from the timestamp
            const minutesSR = "0" + dateSR.getMinutes();
            // Seconds part from the timestamp
            const secondsSR = "0" + dateSR.getSeconds();
            const formattedTimeSR = hoursSR + ':' + minutesSR.substr(-2) + ':' + secondsSR.substr(-2);

            const dateSS = new Date(body.daily.data[0].sunsetTime*1000);
            const hoursSS = dateSS.getHours();
            // Minutes part from the timestamp
            const minutesSS = "0" + dateSS.getMinutes();
            // Seconds part from the timestamp
            const secondsSS = "0" + dateSS.getSeconds();
            const formattedTimeSS = hoursSS + ':' + minutesSS.substr(-2) + ':' + secondsSS.substr(-2);

            callback(undefined,`${body.daily.summary}\n
                                It is currently ${body.currently.temperature} degrees out. \n
                                There is a ${body.currently.precipProbability}% chance of rain. \n
                                The sunrise was at ${formattedTimeSR} and sunset will be at ${formattedTimeSS}.`)
        }
    });
}



module.exports = forecast;