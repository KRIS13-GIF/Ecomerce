import React from "react";
import{Navigate, Outlet} from 'react-router-dom';
// The outlet puts all the condition in a bag

const PrivateComp2=()=>{
    const auth=localStorage.getItem("admin");  // it will work only if it has users. 
    return auth?<Outlet/>:<Navigate to="new-admin"/> // if users exist, Outlet means that we are able to proceed. Else, remain to signup
}

export default PrivateComp2;

//Outlet will check this props and will return the same component if conditions are matched