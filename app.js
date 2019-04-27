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

// welcome page 
app.get('/welcome', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/welcome');
});

// about page 
app.get('/about', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/about');
});

// values page
app.get('/values', function(req, res) {
    res.render('pages/values');
});

// work page
app.get('/work', function(req, res) {
    res.render('pages/work');
});

// brewces page
app.get('/brewces', function(req, res) {
    res.render('pages/brewces');
});

// bochi-bochi page
app.get('/bochi-bochi', function(req, res) {
    res.render('pages/bochi-bochi');
});

// web-apps page
app.get('/web-apps', function(req, res) {
    res.render('pages/web-apps');
});

// freelance page
app.get('/freelance', function(req, res) {
    res.render('pages/freelance');
});

// contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

    
// listen on port 3000
app.listen(process.env.port || 3000);
