import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin=()=>{

    const [email, setEmail]=useState('') // this is by default
    const [password, setPassword]=useState('') // this is by default
    const navigate=useNavigate();



    // The useEffect is very useful if we type the /signup or the /login in the URL and it prohibits us to go there once we are logged in.
    
    
    useEffect(()=>{
        const auth=localStorage.getItem("admin");
        if(auth){
            navigate("/users")
        }
    }, [])
    
    const handleLogin=async()=>{
        //connect with the api of backened
        let result=await fetch("http://localhost:5000/loginAdmin",{
        method:'post',
        body:JSON.stringify({email, password}),
        headers:{
            'Content-Type':'application/json'
        }});

        result=await result.json();
        console.warn(result);
        if(result.name){ // if the details are correct
            //save the data in the local storage to keep the user logged in
            localStorage.setItem('admin', JSON.stringify(result));
            alert("Admin logged in !");
            navigate("/users");
        }
    

    }
    


    return(
        <div className="login">
            <h1>Login Admin</h1>
            <input className="inputBox" type="text" placeholder="Enter email"
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
            
            <input type="password" className="inputBox" placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        
        </div>
    )
}



export default LoginAdmin;