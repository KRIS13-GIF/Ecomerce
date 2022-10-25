import React from 'react';
import { Link, useNavigate } from 'react-router-dom';




const Nav = () => {
    const auth = localStorage.getItem('users');// check if you have created the user in the local storage
    const navigate = useNavigate(); // this is used for redirecting. It updates
    const logout = () => {  // if you click the logout section, the local storage will be clear
        localStorage.removeItem('users'); // deletes the data in the local storage
        navigate('/signup')  // navigates us immediatly to the signup un section

    }

    const logoutAdmin=()=>{
        localStorage.removeItem('admin');
        navigate('/new-admin');
    }

    const admin=localStorage.getItem('admin'); // this is used to logout admin



    // If the auth exists (it means that of the local storage contains the user, show these options and routes, if not show the other two SignUp and Login)
    return (
        <div>
            <img className='logo' alt="logo" src="https://i.pinimg.com/originals/9f/a2/df/9fa2dfbb5ccc35b84aa82239ad91cd8a.png"/>
            {
                auth ?
                    <ul className="nav-ul">
                        <li> <Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        <li><Link to="/update">Update Profile</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li><Link to='/signup'>SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to='/new-admin'>New Admin</Link></li>
                       <li><Link to='/admin'>Admin</Link></li>
                    </ul>
                    
            },
            {
                admin ?
                 <ul className="nav-ul-red nav-right">
                    <li><Link to ="/users">UserList in Mongo</Link></li>
                   
                    <li><Link onClick={logoutAdmin} to="new-admin"> Logout Admin ({JSON.parse(admin).name})</Link></li>
                 </ul>
                :
                <h1></h1>

            }
        

            

        </div>)
}

export default Nav;


// The log out will be displayed only if the authentication is true, or lets say youhave created the user and signed uo

 //<li><Link to="/UpdateUsers">Update User</Link></li> *// not neccessary to update the user