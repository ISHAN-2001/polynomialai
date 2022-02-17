//--Importing modules--//
var express = require('express')
const path = require("path")
const mongoose = require('mongoose')
const app = express()

app.use('/static', express.static('static')) // Static folder

app.set('view engine', 'ejs') // view engine

let url = require('./models/db') // Mongodb activate

//-- Bodyparser--//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//--Routes--//
var home = require('./routes/index.js')
app.use('',home)


//-----404 error page------//
app.use(function (req, res, next) {
    
    res.status(404);
    res.render('404')
  
  });
  

//--- Server--//
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Listening on PORT ${PORT}`);
});
