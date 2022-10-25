import React, { useEffect, useState } from "react";
import {Link }from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([]); // this is an empty array

    useEffect(() => { // this operation is used to do the things only if we enter in the right section
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json(); // we take data from the fetch in the json model
        setProducts(result); // set the data to the array after getting them form the MongoDB
    }

    //deleting the product from the list of products. This is a button
    const deleteProduct=async(id)=>{
      console.warn(id)
      let result=await fetch(`http://localhost:5000/products/${id}`,{
      method:"Delete"
    });
    result=await result.json();

    if(result)
    {
      alert("Product deleted");
      getProducts(); // call the get method again
    }

    }


    const searchHandle=async(e)=>{
      let key=e.target.value; // this one here plays the role os the params to be read and search for the word
      if(key){ // if there are values in the box, it will show th options whcih you are looking for
      let result=await fetch(` http://localhost:5000/search/${key}`);
      result=await result.json();
      if(result){
        setProducts(result) // this operation will show in the table the elements which obtain our values 
      }
    }
    else{ // if the search box is empty, it will show all the products available in the databse
      getProducts();
    }

    }


    console.warn(products);

    return (
        <div className="product-list">
            <h3 className="h3">Product-List</h3>
            <input type="text" className="search-product-box" placeholder="Search product: "
            onChange={searchHandle}/>
            <ul className="h3" >
                <li ><u>S.No.</u></li>
                <li><u>Name</u></li>
                <li><u>Price</u></li>
                <li><u>Category</u></li>
                <li><u>Operation</u></li>
              
            </ul>
          {
            products.length>0 ? // if the array has values
            products.map((item, index)=>
            <ul className="h3" key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li ><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+ item._id}>Update</Link></li> 
            
          </ul>

            )
            : // if the array has no the values which you are interested
            <h1>No result found</h1>
          }
    
        </div>
        
        )
}


export default ProductList;