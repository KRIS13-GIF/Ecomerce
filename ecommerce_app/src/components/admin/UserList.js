import React, { useEffect, useState }  from "react";
import {Link} from 'react-router-dom';


const UserList=()=>{

    const[users, setUsers]=useState([]); // this is an array initialization used for the map method afteward

    useEffect(()=>{
        getUsers();
    }, []);

    const getUsers=async()=>{
        let result=await fetch(' http://localhost:5000/users');
        result=await result.json();
        setUsers(result);
    }

    //deleting the user from the list of products. This is a button
    const deleteUser=async(id)=>{
        console.warn(id)
        let result=await fetch(`http://localhost:5000/users/${id}`,{
        method:"Delete"
      });
      result=await result.json();
  
      if(result)
      {
        alert("User deleted");
        getUsers(); // call the get method again
      }}

      const searchHandle=async(e)=>{
        let key=e.target.value; // this one here plays the role os the params to be read and search for the word
        if(key){ // if there are values in the box, it will show th options whcih you are looking for
        let result=await fetch(` http://localhost:5000/searchUser/${key}`);
        result=await result.json();
        if(result){
          setUsers(result) // this operation will show in the table the elements which obtain our values 
        }
      }
      else{ // if the search box is empty, it will show all the products available in the databse
        getUsers();
      }
  
      }


      return (
        <div className="product-list">
            <h3 className="h3"><h1>User-List</h1></h3>
            <input type="text" className="search-product-box" placeholder="Search user: "
            onChange={searchHandle}/>
            <ul className="h3">
                <li><u>S.No.</u></li>
                <li><u>Name</u></li>
                <li><u>Email</u></li>
                <li><u>Operation</u></li>
              
            </ul>
          {
           users.length>0 ? // if the array has values
            users.map((item, index)=>
            <ul className="h3" key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.email}</li>
            <li><button onClick={()=>deleteUser(item._id)}>Delete</button></li>
            
          </ul>

            )
            : // if the array has no the values which you are interested
            <h1>No result found</h1>
          }
    
        </div>
        
        )

}

export default UserList;