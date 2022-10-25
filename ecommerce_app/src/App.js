
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // for links and routing in react
import Footer from './components/footer';
import SignUp from './components/product/Signup';
import PrivateComp from './components/product/PrivateComp';
import Login from './components/product/Login';
import AddProduct from './components/product/AddProduct';
import ProductList from './components/product/ProductList';
import UpdateProduct from './components/product/Update';
import NewAdmin from './components/admin/NewAdmin';
import LoginAdmin from './components/admin/LoginAdmin';
import PrivateComp2 from './components/admin/PrivateComp2';
import UserList from './components/admin/UserList';
//import UpdateUser from './components/admin/UpdateUser';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<h1><ProductList/></h1>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>Logout component</h1>} />
            <Route path="/update" element={<h1>Update component</h1>} />
            <Route path="/error" element={<h1>Error in login</h1>}/>
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-admin" element={<NewAdmin/>}/>
          <Route path="/admin" element={<LoginAdmin/>}/>

          <Route element={<PrivateComp2/>}>
            <Route path="/users" element={<UserList/>}></Route>
          </Route>

         

        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

// keep in mind that the update operation works only when you give the /:id feature.

export default App;
