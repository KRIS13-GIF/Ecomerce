const express = require("express");
const app = express();
require('./config/config');
const cors = require('cors');
const { User } = require('./models/user');
const { Product } = require('./models/product')
const {Admin}=require('./models/admin');



app.use(express.json());
app.use(cors());


//Route for registering the user
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();

    // we turn the result into object in order to delete
    result = result.toObject();
    delete result.password;

    res.send(result);
})


// Route for the login user

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password") // checking in the User's array of registers
        //showing all the fields excpt password
        if (user) {
            res.send(user);
        }
        else {
            res.send("User not found");
        }

    }
    else {
        res.send("Name or passowrd is missing");

    }
})


//route for login Admin
app.post('/loginAdmin', async(req, res)=>{
    if(req.body.password && req.body.email){
        let admin=await Admin.findOne(req.body).select("-password")
        if(admin){
            res.send(admin)
        }
        else{
            res.send("Admin not found");
        }
    }
})
 


//api for adding the product to mongo db collection products
app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send('No product found')
    }
})


// api for getting the user's list
app.get("/users", async(req,res)=>{
    let users=await User.find();
    if(users.length>0){
        res.send(users)
    }
    else{
        res.send("No user found")
    }
});

app.delete("/products/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});


app.delete("/users/:id", async(req,res)=>{
    let result=await User.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get("/products/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    }
    else {
        res.send("Not a valid id")
    }
});


//api for getting a specific user
app.get("/users/:id", async(req, res)=>{
    let result=await User.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send("Not a valid Id for users");
    }
})


// api for updating
app.put("/products/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id }, 
        { $set: req.body })
    res.send(result);
});


//api for updating the user
app.put("/users/:id", async(req, res)=>{
    let result=await User.updateOne(
        { _id: req.params.id},
        { $set: req.body})
    res.send(result);
});




//api used for searching a specific elements by their name
app.get("/search/:key", async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {
                // this part here filters in the database and selects all the names which do have that specific element
                name: { $regex: req.params.key}
            },

            //finding the company which contains the specific letter
            {
                company: { $regex: req.params.key}
            },
            {
                category: { $regex: req.params.key}
            }
            
        ]
    });
    res.send(result);

});


// api for searching the user by using a character, name or else
app.get("/searchUser/:key", async(req,res)=>{
    let result = await User.find({
        "$or":[
            {
                // this part here filters in the database and selects all the names which do have that specific element
                name: { $regex: req.params.key}
            },

            //finding the company which contains the specific letter
            {
                email: { $regex: req.params.key}
            }
            
        ]
    });
    res.send(result);

});


// add admin
app.post("/new-admin", async(req,res)=>{
    let result=new Admin(req.body);
    result=await result.save();
    res.send(result);
});


app.get("/admin", async(req, res)=>{
    let admins=await Admin.find().select()
    ;
    if(admins.length>0){
        res.send(admins);
    }
    else{
        res.send("No admin found");
    }
});








app.listen(5000, () => {
    console.log("The server is running...")
});