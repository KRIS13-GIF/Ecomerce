import React,{useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct=()=>{
    
const [name, setName]=useState('');
const [price, setPrice]=useState('');
const [category, setCategory]=useState('');
const [company, setCompany]=useState('');
const params=useParams(); // is used to catch the values of the url like "id" // also we use it very often in the backend part
const navigate=useNavigate(); // we need this hook to redirect us to the product list 

// this works only if we are in this section
useEffect(()=>{
    getProductDetails(); // it will automatically autofill the boxes with the product's data
}, [])


// get details for a specific product like the get id method for only one 
const getProductDetails=async()=>{
    let result=await fetch(`http://localhost:5000/products/${params.id}`); // get the detaild for the selected id which is taken from params.id
        result=await result.json();
        // we need these schema for autofilling the fields. So when we click the update button and it redirects us to the Update section, you can 
        //see the name, price, category, etc filled with the values ready to be changes, because when using the set method you take the values from the "result" array 
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category)
        setCompany(result.company);
    
}



const updateProduct=async()=>{
    console.warn(name, price, category, company);
    let result=await fetch(`http://localhost:5000/products/${params.id}`,{
        method:"Put",
        body:JSON.stringify({name, price, category, company}),
        headers:{
            'Content-Type':"Application/json"
        }
    });

    result=await result.json();
    if(result){
        alert("Product updated");
        navigate("/");
        
    }

}


    return(
        <div className="product">
            <h1>Update product</h1>
            <input  type="text" placeholder="Enter product name " className='inputBox' value={name}
             onChange={(e)=>setName(e.target.value)}/>
           
    
           
            
            <input type="text" placeholder="Enter product price "className='inputBox' value={price}
            onChange={(e)=>setPrice(e.target.value)}/>
          
            
            
            <input type="text" placeholder="Enter product category " className='inputBox' value={category}
            onChange={(e)=>setCategory(e.target.value)}/>
           


            <input type="text" placeholder="Enter product company"className='inputBox' value={company}
            onChange={(e)=>setCompany(e.target.value)}/>
           
            

            <button onClick={updateProduct} className='appButton'>Update Product</button>
            </div>)
}

export default UpdateProduct;