var express = require('express');
// var path = require('path');
const mclient = require('mongodb').MongoClient;
//cors
const cors = require('cors');


//import path module
const path = require('path');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var verifyTicket = require('./routes/verifyTicket');

var app = express();

//connect build of react with nodejs
app.use(express.static(path.join(__dirname, 'build')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//database connection using mongodb
const DBurl = "mongodb+srv://rohandb:babu4321@cluster0.mfaor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//connect with mongodb server
mclient.connect(DBurl).then((client) => {
    //get the database object 
    const db = client.db('TEDxVNR');

    //creating a collection
   let Tickets = db.collection('Tickets');

    //sharing collection object to API
    app.set('Tickets', Tickets)

    console.log("Connection to MongoDB Server Successful")
}).catch(err => {
    console.log("Connection to MongoDB Server Failed", err);
})




// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ticket', verifyTicket);

//get request for home page
app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  res.send(path.resolve(__dirname, 'build', 'index.html'))
  // res.send("hi")
})

//dealing with page refresh
app.get('*', (req, res) => {
  app.use(express.static(path.resolve(__dirname, 'build')));
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("error")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//listen to port 4000
app.listen(4000, () => {
  console.log('Server is running on port 4000');
})

module.exports = app;
