//////To allow contact form code to fire on HV PC/////
if (process.env.NODE_ENV !== "production") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongo = require("mongodb");
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const db = mongoose.connection;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dtq0sudxq",
  api_key: "729278569448928",
  api_secret: "klJh4a5F6PvXM3DJrYohuilJzdg"
});

// set location for static files like .css
app.use(express.static(__dirname + "/public"));

// set the view engine to ejs
app.set("view engine", "ejs");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes /////////////////////////////////////////////////////////////////////////////////////*/

// home page
app.get("/", function(req, res) {
  // use res.render to load up an ejs view file
  res.render("pages/index");
});

// about page
app.get("/about", function(req, res) {
  // use res.render to load up an ejs view file
  res.render("pages/about");
});

// values page
/*app.get("/values", function(req, res) {
  res.render("pages/values");
});*/

//pricing page
app.get("/pricing", function(req, res) {
  res.render("pages/pricing");
});

// work page
app.get("/work", function(req, res) {
  res.render("pages/work");
});

// brewces page
app.get("/brewces", function(req, res) {
  res.render("pages/brewces");
});

// bochi-bochi page
app.get("/bochi-bochi", function(req, res) {
  res.render("pages/bochi-bochi");
});

// web-apps page
app.get("/applications", function(req, res) {
  res.render("pages/applications");
});

// freelance page
app.get("/freelance", function(req, res) {
  res.render("pages/freelance");
});

// contact page
app.get("/contact", function(req, res) {
  res.render("pages/contact");
});

// privacy policy
app.get("/privacy", function(req, res) {
  res.render("pages/privacy");
});

// referral agreement page
app.get("/referral", function(req, res) {
  res.render("pages/referral");
});

//Set up default mongoose connection
var mongoDB = "mongodb://localhost:27017/TTT";
//var cosmosDB = 'mongodb://sigma-registration-app-db:RTZw4y1Zi1PnCaOaxbfXUD9HfoGq3qOIfTuoqH7GXgxC93ZENSioKZJp44ILYsm3eRIvhVDtNfeCy2LfI3trTw==@sigma-registration-app-db.documents.azure.com:10255/?ssl=true';

mongoose.connect(process.env.MONGO_URL || mongoDB, { useNewUrlParser: true });
mongoose.connection.on("error", console.error.bind(console, "Mongo error:"));

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Added the following 'mongoose.set' to remove this console warning:
//(node:3916) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
//mongoose.set('useCreateIndex', true)

// blog page
app.get("/blog", (req, res) => {
  //pass in title of blog post on request object. Use to filter db result. Pass back result
  //the blog page queries db for all results and passes results to blog.ejs in 'blogPosts' variable
  db.collection("blogPosts")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // else renders list.ejs
      res.render("pages/blog", { blogPosts: result });
    });
});

app.get("/blog/:id", async (req, res) => {
  let id = ObjectID(req.params.id);
  let blogCollection = await db.collection("blogPosts");

  blogCollection.findOne({ _id: id }, (err, result) => {
    if (err) {
      console.log("failed blog id page");
    } else {
      res.render("pages/singlePost", { singlePost: result });
    }
  });
});

// news page
app.get("/news", function(req, res) {
  //cloudinary for news page
  let newsImages = [];
  for (var i = 1; i < 7; i++) {
    newsImages.push("news_" + i + ".jpg");
  }
  let newsUrls = [];
  newsImages.forEach(function(image) {
    newsUrls.push(cloudinary.image(image));
  });
  //let news1 = cloudinary.image("news_1.jpg");
  //console.log(news1);
  res.render("pages/news", { newsUrls });
});

/* Enquiry form ///////////////////////////////////////////////////////////////////////////*/
app.post("/send", (req, res) => {
  //strip HTML special characters from form input. Consent not sanitized as not a string
  function sanitizeInput(input) {
    if (input) {
      const sanitizedOutput = input.replace(/(<([^>]+)>)/gi, "");
      return sanitizedOutput;
    } else {
      console.log("no input");
    }
  }

  async function sendEmail() {
    const output = `
        <p>You have a new contact message</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${sanitizeInput(req.body.name)}</li>
            <li>Company: ${sanitizeInput(req.body.company)}</li>
            <li>Email: ${sanitizeInput(req.body.email)}</li>
            <li>Telephone: ${sanitizeInput(req.body.telephone)}</li>
            <li>Consent: ${req.body.consent}</li>
        </ul>
        <h3>Message</h3>
        <p>${sanitizeInput(req.body.message)}</p>
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
      refresh_token:
        "1/7JFLOqrcA9hpYTQ_pTw5DIL9wsWtjZVVh1c_VKRdlXx1Rb0eL_VhZcgDJamF_SO_"
    });
    const tokens = await oauth2Client.getAccessToken;
    //const accessToken = tokens.credentials.access_token;
    const accessToken = tokens.token;

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "jvickersdesign@gmail.com",
        clientId:
          "525798945078-jnjdtgm79denmdgce0qvc7itjrguilnl.apps.googleusercontent.com",
        clientSecret: "oxB9q4kbBA_WMgO8h11cYTkW",
        refreshToken:
          "1/7JFLOqrcA9hpYTQ_pTw5DIL9wsWtjZVVh1c_VKRdlXx1Rb0eL_VhZcgDJamF_SO_",
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: "jvickersdesign@gmail.com",
      to: "james.vickers@treetops.tech, hannah.vickers@treetops.tech",
      subject: "New customer enquiry for Treetops Tech",
      generateTextFromHTML: true,
      html: output
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log("Form submitted");
      smtpTransport.close();
    });
  } // That last brace is to close off our async function

  //only continue if consent given, else raise error
  if (req.body.consent) {
    sendEmail();
    res.render("pages/thank-you");
  } else {
    console.log("no consent given");
  }
});

/* MongoDB ///////////////////////////////////////////////////////////////////////////////////////////////////*/

/*

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/TTT';

mongoose.connect(process.env.MONGO_URL || mongoDB, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'Mongo error:'));

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Added the following 'mongoose.set' to remove this console warning:
//(node:3916) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
//mongoose.set('useCreateIndex', true)

//Define a schema
var Schema = mongoose.Schema;

var visitorSchema = new Schema({
    title: { type: String, uppercase: true },
    mainContent: { type: String, uppercase: true },
    author: { type: String, uppercase: true },
    created: {type: Date, default: Date.now},
});

// Compile model from schema
var visitorModel = mongoose.model('Register', visitorSchema );
var visitorModelInstance;


// on /enter form submission, save entry to db collection then redirect to /enter-success.ejs 
app.post('/enter', (req, res) => {
    visitorModelInstance = new visitorModel(req.body);
    visitorModelInstance.save()
    .then(item => {
       res.redirect('/enter-success');
    })
    .catch(err => {
        res.status(400).send('unable to save to database');
    });
});

// on /exit form submission, remove entry from db collection then redirect to /exit-success.ejs 
app.post('/exit', (req, res) => {
    visitorModel.deleteOne( { 'firstName': req.body.firstName.toUpperCase(), 'lastName': req.body.lastName.toUpperCase() }, function (err, response) {
        if (err) return handleError(err);
       // response contains { n: 1, ok: 1 }
       if (response.n > 0) {
        res.redirect('/exit-success');
       } else {
        res.redirect('/oops');
       }
    });
});

*/

// listen on port 3000
app.listen(process.env.port || 3000);
