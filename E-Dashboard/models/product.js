const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({

    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
    
});
const Product=mongoose.model('Product', productSchema);


exports.Product=Product;

