const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// set location for static files like .css
app.use(express.static(__dirname + '/public'))

// set the view engine to ejs
app.set('view engine', 'ejs');


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes *************************************************************************************

// home page 
app.get('/', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/index');
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
app.get('/applications', function(req, res) {
    res.render('pages/applications');
});

// freelance page
app.get('/freelance', function(req, res) {
    res.render('pages/freelance');
});

// contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

// Enquiry form
app.post('/send', (req, res) => {

    async function sendEmail() {

        const output = `
        <p>You have a new contact message</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Telephone: ${req.body.telephone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `;
        
        // youremailprogram.js
        const nodemailer = require("nodemailer");
        const { google } = require("googleapis");
        const OAuth2 = google.auth.OAuth2;


        // clientID, client secret, redirect url
        const oauth2Client = new OAuth2(
            "525798945078-jnjdtgm79denmdgce0qvc7itjrguilnl.apps.googleusercontent.com",
            "oxB9q4kbBA_WMgO8h11cYTkW",
            "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
            refresh_token: "1/7JFLOqrcA9hpYTQ_pTw5DIL9wsWtjZVVh1c_VKRdlXx1Rb0eL_VhZcgDJamF_SO_"
            });
        const tokens = await oauth2Client.refreshAccessToken()
        const accessToken = tokens.credentials.access_token

        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "jvickersdesign@gmail.com", 
                clientId: "525798945078-jnjdtgm79denmdgce0qvc7itjrguilnl.apps.googleusercontent.com",
                clientSecret: "oxB9q4kbBA_WMgO8h11cYTkW",
                refreshToken: "1/7JFLOqrcA9hpYTQ_pTw5DIL9wsWtjZVVh1c_VKRdlXx1Rb0eL_VhZcgDJamF_SO_",
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "jvickersdesign@gmail.com",
            to: "jvickersdesign@gmail.com",
            subject: "New customer enquiry for Treetops Tech - Secure OAuth",
            generateTextFromHTML: true,
            html: output
            };

        smtpTransport.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log(response);
                smtpTransport.close();
            });
    } // That last brace is to close off our async function
        
    sendEmail(); 
    res.render('pages/thank-you');
});

    
// listen on port 3000
app.listen(process.env.port || 3000);
