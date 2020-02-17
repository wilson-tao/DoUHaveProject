const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'public/build')));


// Require Routes
// const <variable> = require('<URL>');
//const apiSignin = require('./routes/api/signin');
//require("./routes/api/signin")(app);
const userRoutes = require('./routes/api/user');
const itemRoutes = require('./routes/api/items');
const savelistRoutes = require('./routes/api/savelist');
const offerRoutes = require('./routes/api/offers');
const zipRoutes = require('./routes/api/zips');

//Required Middleware
app.use(morgan('dev'));
app.use('/itempics', express.static('itempics'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());
app.disable('x-powered-by');


//CORS Error Handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//Connect Database
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




// Use routes
// app.use('<URL>', <variable> );
//app.use('/', app);
app.use('/user', userRoutes);
app.use('/items', itemRoutes);
app.use('/savelist', savelistRoutes);
app.use('/offers', offerRoutes);
app.use('/zips', zipRoutes);



app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname+'/public/build/index.html'));
  //res.redirect('https://' + req.headers.host + req.url);
});

app.get('/*', function(req, res) {

  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  //res.redirect('https://' + req.headers.host + req.url);
});


//SSL Redirect

//app.get("*", function(request, response){
//  response.redirect("https://" + request.headers.host + request.url);
//});

//app.use(function(request, response) {
//  if (!request.secure){
//    response.redirect("https://" + request.headers.host + request.url);
//  }
//});

//app.use(function(request, response) {
//  if (request.protocol === "http"){
//    response.redirect("https://" + request.headers.host + request.url);
//  }
//});


//Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req,res, next) => {
  res.status((error.status) || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


//SSL Certs
//const options = {
//  cert: fs.readFileSync('/etc/letsencrypt/live/douhave.org/fullchain.pem', 'utf8'),
//  key: fs.readFileSync('/etc/letsencrypt/live/douhave.org/privkey.pem', 'utf8')
//};


//Declare Port and Start Server
const normalizePort = port => parseInt(port, 10);
const port = normalizePort(process.env.PORT || 5000);

//More SSL Redirect tries...
app.enable('trust proxy');
app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});


app.listen(port, () => console.log(`Server started on port ${port}`));

//SSL Secure Server
//https.createServer(options, app).listen(443, () => console.log(`HTTPS Server running on port 443`));
