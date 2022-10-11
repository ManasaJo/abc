const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//list of fields for employee schema
let Employee = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
},{collection:'employees'}
);

module.exports = mongoose.model('Employee',Employee);