import './App.css';
import User from './components/user';
import Navbar from './components/Navbar';
import Home from './components/home';
import React from 'react';
import {Routes , Route} from 'react-router-dom'
import Login from './components/login';
import Product from './components/product';
import EditUser from './components/edit_user';
import EditProduct from './components/edit_product';
import AddUser from './components/add_user';
import AddProduct from './components/add_product';
import OrderHistory from './components/order_history';
import { Provider } from 'react-redux/es/exports';
import { store } from './state/store';
import Logfile from './components/LogFile';

function App() {
  return (
    <div className="App">
            <Provider store={store}>
              <Routes>
                  <Route path="/" element={<Login/>} />
                  <Route path="/addUser" element={<AddUser/>} />
                  <Route path="/addProduct" element={<AddProduct/>} />
                  <Route path="/Navbar" element={<Navbar/>} />
                  <Route path="/Product" element={<Product/>} />
                  <Route path="/edit/:id" element={<EditUser />} />
                  <Route path="/editproduct/:id" element={<EditProduct />} />
                  <Route path="/Home" element={<Home/>} />
                  <Route path="/User" element={<User/>} />
                  <Route path="/OrderHistory" element={<OrderHistory/>} />
                  <Route path="/LogFiles" element={<Logfile/>} />
              </Routes>
            </Provider>
    </div>
  );
}
export default App;
