import React,{useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateUser=()=>{
    const[name, setName]=useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const params=useParams();
    const navigate=useNavigate();



    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails=async()=>{
        let result=await fetch(`http://localhost:5000/users/${params.id}`);
        result=await result.json();

        setName(result.name);
        setPassword(result.password);
        setEmail(result.email);
    }

    const updateUser=async()=>{
        let result=await fetch(`http://localhost:5000/users/${params.id}`,{
            method:"Put",
            body:JSON.stringify({name, email, password}),
            headers:{
                'Content-Type':'Application/json'
            }
        });

        result=await result.json();
        if(result){
            alert("User updated!");
            navigate("/users");
        }
    }


    return(

    <div className="product">
            <h1>Update User</h1>
            <input  type="text" placeholder="Enter user's name " className='inputBox' value={name}
             onChange={(e)=>setName(e.target.value)}/>
           
            <input type="text" placeholder="Enter email "className='inputBox' value={email}
            onChange={(e)=>setPassword(e.target.value)}/>
          
            <input type="text" placeholder="Enter password " className='inputBox' value={password}
            onChange={(e)=>setEmail(e.target.value)}/>
         
            <button onClick={updateUser} className='appButton'>Update User</button>
            </div>)
}

export default UpdateUser;