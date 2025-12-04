import React, { useState } from 'react';
import './MainAdmin.css';
import City from "./City";
import StateMgt from "./StateMgt";
import ProductCatg from "./ProductCatg";
import CustomerMgt from "./CustomerMgt";
import ProductList from "./ProductList";
import ShowBills from "./ShowBills";
import VendorMgt from "./VendorMgt";

function MainAdmin() {
  const [activeSection, setActiveSection] = useState("");

  const toggleSection = (section) => {
    setActiveSection(prev => (prev === section ? "" : section));
  };

  return (
    <div className="admin-main">
      <header className="admin-header">
        💫 Welcome to Admin Dashboard 💫
      </header>

      <div className="admin-buttons">
        <button onClick={() => toggleSection("state")}>State Management</button>
        <button onClick={() => toggleSection("city")}>City Management</button>
        <button onClick={() => toggleSection("productCatg")}>Product Categories</button>
        <button onClick={() => toggleSection("customer")}>Customer Management</button>
        <button onClick={() => toggleSection("productList")}>Product List</button>
        <button onClick={() => toggleSection("bills")}>Show Bills</button>
        <button onClick={() => toggleSection("vendor")}>Vendor Management</button>
      </div>

      <div className="admin-content">
        {activeSection === "state" && (
          <div className="section">
            <h2>State Management</h2>
            <StateMgt />
          </div>
        )}
        {activeSection === "city" && (
          <div className="section">
            <h2>City Management</h2>
            <City />
          </div>
        )}
        {activeSection === "productCatg" && (
          <div className="section">
            <h2>Product Categories</h2>
            <ProductCatg />
          </div>
        )}
        {activeSection === "customer" && (
          <div className="section">
            <h2>Customer Management</h2>
            <CustomerMgt />
          </div>
        )}
        {activeSection === "productList" && (
          <div className="section">
            <h2>Product List</h2>
            <ProductList />
          </div>
        )}
        {activeSection === "bills" && (
          <div className="section">
            <h2>Show Bills</h2>
            <ShowBills />
          </div>
        )}
        {activeSection === "vendor" && (
          <div className="section">
            <h2>Vendor Management</h2>
            <VendorMgt />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainAdmin;
