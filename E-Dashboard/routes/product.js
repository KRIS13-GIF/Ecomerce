const{Product} =require('../models/product');


const connectDB=async()=>{
    const data=await Product.find();
    console.warn(data);
}

exports.connectDB=connectDB