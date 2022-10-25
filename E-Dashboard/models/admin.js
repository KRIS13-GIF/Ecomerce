const mongoose = require('mongoose');

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
      
    },
    password:{
        type:String,
       
    }
});

const Admin = mongoose.model('admin', adminSchema);

exports.Admin=Admin;