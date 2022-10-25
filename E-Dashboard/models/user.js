const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
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

const User = mongoose.model('users', userSchema);

exports.User=User;