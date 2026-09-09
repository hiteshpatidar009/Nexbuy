import React, { useState } from "react";
import MainAdmin from "./MainAdmin";
import { renderApp } from "../renderApp";

function AdminLogin() {
  const [uid, setUId] = useState("");
  const [upass, setUPass] = useState("");

  const handleUIdText = (evt) => setUId(evt.target.value);
  const handleUPassText = (evt) => setUPass(evt.target.value);

  const handleLoginButton = () => {
    if (uid === "admin" && upass === "abc@123") {
      renderApp(<MainAdmin />);
    } else {
      alert("Invalid ID/Password");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="border rounded shadow p-5 bg-white" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center mb-4">🛡️ Admin Login 🛡️</h2>

        {/* Admin ID */}
        <div className="mb-3">
          <label className="form-label fw-bold">Admin ID</label>
          <input
            type="text"
            value={uid}
            onChange={handleUIdText}
            placeholder="Enter Admin ID"
            className="form-control"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            value={upass}
            onChange={handleUPassText}
            placeholder="Enter Password"
            className="form-control"
          />
        </div>

        {/* Login Button */}
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleLoginButton}
          >
            Login
          </button>
        </div>
     
      </div>
    </div>
  );
}

export default AdminLogin;
