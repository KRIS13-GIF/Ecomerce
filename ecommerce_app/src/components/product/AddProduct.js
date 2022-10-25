import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct=()=>{
    
const [name, setName]=useState('');
const [price, setPrice]=useState('');
const [category, setCategory]=useState('');
const [company, setCompany]=useState('');
// This hook is for the error
const[error, setError]=useState(false);
const navigate=useNavigate();


const addProduct=async()=>{


    // This here checks for the errors when the fields are blank. 
    if(!name || !price || !company || !category){
        setError(true);
        return false;
    }



    console.warn(name, price, category, company);
    // the local storage will only save the id
    const userId=JSON.parse(localStorage.getItem('users'))._id; // selecting only the user's id
    console.warn(userId);
    let result= await fetch("http://localhost:5000/add-product", {
        method:"post",
        body:JSON.stringify({name, price, category, company}),
        headers:{
            'Content-Type':'application/json'
        }});
    result=await result.json();
    if(result){
        alert("Product added !");
        navigate("/");
    }
    console.warn(result);
};



    return(
        <div className="product">
            <h1>Add product</h1>
            <input  type="text" placeholder="Enter product name " className='inputBox' value={name}
             onChange={(e)=>setName(e.target.value)}/>
           {error && !name &&<span className='err'>Enter valid name</span>}
    
           
            
            <input type="text" placeholder="Enter product price "className='inputBox' value={price}
            onChange={(e)=>setPrice(e.target.value)}/>
           {error && !price &&<span className='err'>Enter valid password</span>}
            
            
            <input type="text" placeholder="Enter product category " className='inputBox' value={category}
            onChange={(e)=>setCategory(e.target.value)}/>
            {error && !price &&<span className='err'>Enter valid category</span>}


            <input type="text" placeholder="Enter product company"className='inputBox' value={company}
            onChange={(e)=>setCompany(e.target.value)}/>
            {error && !price &&<span className='err'>Enter valid company</span>}
            

            <button onClick={addProduct} className='appButton'>Add Product</button>
            </div>)
}

export default AddProduct;