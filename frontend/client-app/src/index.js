import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import MainAdmin from './Admin/MainAdmin';
import VenderReg from "./vender/VenderReg"
import CustomerReg from "./Customer/CustomerReg";
import CustomerLogin from "./Customer/CustomerLogin"
import ProductList from './product/ProductList';
import Product from "./product/Product"
import AdimnHome from "./Admin/AdminHome"
import Nexbuy from './NexBuy/Nexbuy';
import 'bootstrap/dist/css/bootstrap.min.css';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
   {/* <MainAdmin/> */}
   {/* <VenderReg/> */}
   {/* <CustomerReg/> */}
   {/* <CustomerLogin/> */}
  {/* <Product/>
   <ProductList/> */}
   {/* <AdimnHome/> */}
   <Nexbuy/>
   {/* <MainAdmin/> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
