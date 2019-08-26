const path = require('path');
//import the express function
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//create a variable to contain the express function. 
//This will enable server configuring
//allows to set up the routes!!!!! 'app.get' 'app.put'
const app = express();
const port = process.env.PORT || 3000;

/********** these 2 are express configure commands.***********/
// console.log(__dirname);
//'path.join' allows you to move and create a path.
//this allows you to point 'app.send' to files to get the html data
const publicDirPath = path.join(__dirname, '../public');
//this changes the default folder for the handlebars templates 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


/********** these are handlebars configure commands.***********/
app.set('view engine','hbs');
//now enact the new 'template' path.
app.set('views', viewsPath);//this MUST be after the 'view engine' set above.
hbs.registerPartials(partialsPath);

/********** this sets up the static directory to server.***********/
//so you don't need 'app.get' functions to simply display the pages
app.use(express.static(publicDirPath));

// '' means the home page.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mark Moore'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Pregnancy App',
        name: 'Arely Moore'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP me PAGE',
        paragraph: 'This is the paragraph for the help page.',
        name: 'Maya Moore'
    });
});

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided.'
        });
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({error});
        }
        
        //use the data variable above to send long and lat to forcast.
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error}); 
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            }); 
        });
    });
});

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
         })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
}); 

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Mark Moore',
        paragraph: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Mark Moore',
        paragraph: '404 - Page not found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});