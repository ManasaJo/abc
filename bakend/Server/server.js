//import required packages
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
path = require('path');
cors = require('cors');

//MongoDB url
var mongoDatabase = 'mongodb://localhost:27017/meancruddemo';

//create express server
const app = express();
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(mongoDatabase,{useNewUrlParser:true}).then(
    ()=>{
        console.log('Database is connected...');
    },
    err=>{
        console.log('Failed to connect to database'+err);
    }
);

//all the express routes
const employeeRoutes = require('../Routes/Employee.route');

//converting incoming data to json format
app.use(bodyParser.json());

//enable cors
app.use(cors());

//setup for server port number
const port = process.env.PORT || 4000;

//Routes configuration
app.use('/employees',employeeRoutes);

//start express server
const server = app.listen(port,function(){
console.log("server is listening to port:" +port);
});
