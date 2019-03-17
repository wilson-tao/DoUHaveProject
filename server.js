const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'public/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});


// Require Routes
// const <variable> = require('<URL>');
//const apiSignin = require('./routes/api/signin');
//require("./routes/api/signin")(app);
const userRoutes = require('./routes/api/user');
const itemRoutes = require('./routes/api/items');
const savelistRoutes = require('./routes/api/savelist')

//Required Middleware
app.use(morgan('dev'));
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
});


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

//Declare Port and Start Server
const normalizePort = port => parseInt(port, 10);
const port = normalizePort(process.env.PORT || 5000);

app.listen(port, () => console.log(`Server started on port ${port}`));
