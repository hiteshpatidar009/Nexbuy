import React from 'react'
import{Link,Route,Routes} from "react-router-dom";
import  Admin from "./Admin/AdminLogin";
import  Vendor from "./vender/VenderLogin";
import  Customer from "./Customer/CustomerLogin";

// import About from "./About";



function NexBuyRout() {
  return (
   
    
        <div>
            
                < Link to="/admin">Admin</Link><span></span>
                {/* <Link to="/about">About</Link><span></span> */}
                <Link to="/vender">Contact</Link><span></span>
                <Link to="/customer">Customer</Link><span></span>

                <Routes>
                    <Route path="/admin"element={<Admin/>}></Route>
                    {/* <Route path="/about"element={<About/>}></Route> */}
                    <Route path="/vender"element={<Vendor/>}></Route>
                    <Route path="/customer"element={< Customer/>}></Route>
                </Routes>
    
                Customer
    </div>
  )
}

export default NexBuyRout
