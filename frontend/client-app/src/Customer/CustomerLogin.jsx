import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerHome from "./CustomerHome";
import ReactDOM, { createRoot } from "react-dom/client";
import cookies from "js-cookie";
import Registration from "../Customer/CustomerReg"

function CustomerLogin(props) {
  const [uid, setUId] = useState("");
  const [upass, setUPass] = useState("");
  const [ischecked, setIsChecked] = useState(false);

  const handleUIdText = (evt) => setUId(evt.target.value);
  const handleUPassText = (evt) => setUPass(evt.target.value);
  const handleIsRemember = () => setIsChecked(true);

  useEffect(() => {
    const myCookies = cookies.get("auth");
    if (myCookies !== undefined) {
      const obj = JSON.parse(myCookies);
      setUId(obj.username);
      setUPass(obj.password);
    }
  }, []);

  const handleLoginButton = () => {
    const obj = { CUserId: uid, CUserPass: upass };

    axios.post("http://localhost:9669/customer/login", obj).then((res) => {
      if (res.data.CUserId !== undefined) {
        if (res.data.status === "inActive") {
          alert("User not active. Please wait for admin activation.");
          return;
        }

        if (ischecked === true) {
          const userData = { username: uid, password: upass };
          const expirationTime = new Date(new Date().getTime() + 6000000);
          cookies.set("auth", JSON.stringify(userData), { expires: expirationTime });
        }

        const userSessionData = { userfullname: res.data.CustomerName };
        const sessionExpirationTime = new Date(new Date().getTime() + 60000);
        sessionStorage.setItem("sessionauth", JSON.stringify(userSessionData), sessionExpirationTime);
        localStorage.setItem("isLoggedIn", "true");

        const root = ReactDOM.createRoot(document.getElementById("root"));
        const selitems = props.data?.selitems || [];

        const obj = {
          cfname: res.data.CustomerName,
          cid: res.data.Cid,
          cpicname: res.data.CPicName,
          selitems: selitems,
        };

        root.render(<CustomerHome data={obj} />);
      } else {
        alert("Invalid ID/Password");
      }
    });
  };
   const handleRegistrationbutton =()=>{
    
    const root = ReactDOM.createRoot(document.getElementById("root"));
       
       root.render(<Registration/>);
   }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="border rounded shadow p-5 bg-white" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center mb-4">🧑‍🌾👤 Customer Login 👤🧑‍🌾</h2>

        {/* User ID */}
        <div className="mb-3">
          <label className="form-label fw-bold">User ID</label>
          <input
            type="text"
            value={uid}
            onChange={handleUIdText}
            placeholder="Enter your User ID"
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
            placeholder="Enter your Password"
            className="form-control"
          />
        </div>

        {/* Remember Me */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleIsRemember}
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
        </div>

        {/* Login Button */}
        <div className="d-grid mb-3">
          <button type="button" className="btn btn-primary" onClick={handleLoginButton}>
            Login
          </button>
        </div>

        {/* Optional Register */}
        <div className="text-center">
          <p className="mb-2">Don't have an account?</p>
          <button type="button" className="btn btn-outline-danger" onClick={handleRegistrationbutton}>
            Register
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
