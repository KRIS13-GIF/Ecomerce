import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // this is usefulf to redirect to other pages

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // used for the login
    useEffect(() => {
        
        const auth = localStorage.getItem('users');
        const admin=localStorage.getItem('admin');
        
        if (auth) { navigate('/') }
         // if you are logged in, you can not go to the sign up section because it is useless
        else if(admin){
            navigate('/admin')
        }
    }, [])


    // The sign Up functionality  ( no need to use axios)
    const collectData = async () => {

        //default api function
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);

        // we save the data in the local storage but we can not store them as json, so we use stringify
        localStorage.setItem("users", JSON.stringify(result), [result]);
        navigate('/'); // you redirected to the welcome page after you sign up (click)
    }

    return (
        <div className="register">
            <h1>Register User</h1>
            <input className="inputBox" type="text" placeholder="Enter name"
                value={name} onChange={(e) => setName(e.target.value)} />

            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;