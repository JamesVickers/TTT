const express = require('express');
const app = express();


// set location for static files like .css
app.use(express.static(__dirname + '/public'))

// set the view engine to ejs
app.set('view engine', 'ejs');


// Routes *************************************************************************************

// home page 
app.get('/', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/index');
});

// team page 
app.get('/team', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/team');
});

// values page
app.get('/values', function(req, res) {
    res.render('pages/values');
});

// services page
app.get('/services', function(req, res) {
    res.render('pages/services');
});

// examples page
app.get('/examples', function(req, res) {
    res.render('pages/examples');
});

// services page
app.get('/details', function(req, res) {
    res.render('pages/details');
});

// services page
app.get('/enquire', function(req, res) {
    res.render('pages/enquire');
});

    
// listen on port 3000
app.listen(process.env.port || 3000);
