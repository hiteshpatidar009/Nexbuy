import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import VenderReg from "./VenderReg";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import VenderHome from "./VenderHome";
function VenderLogin() {

    const [uid, setUId] = useState("");
    const [upass, setUPass] = useState("");
    const [ischecked, setIsChecked] = useState("");

    const handleUIdText = (evt) => {
        setUId(evt.target.value);
    }

    const handleUPassText = (evt) => {
        setUPass(evt.target.value);
    }

    useEffect(() => {
        var mycookies = Cookies.get('vauth');
        if (mycookies !== undefined) {
            var obj = JSON.parse(mycookies);
            //alert(obj.username);
            setUId(obj.username);
            setUPass(obj.password);
        }
    }, [])

    const handleLoginButton = () => {
        var obj = {
            vuid: uid,
            vupass: upass
        };
        axios.post("http://localhost:9669/vender/login", obj).then((res) => {
          


            if (res.data.VUserId !== undefined) {
                if (res.data.Status == "Inactive") {
                    alert("User Not Active Please Wait For Admin Activation Process");
                    return;
                }
                //cookies handling code
                if (ischecked == true) {
                    const userData = {
                        username: uid,
                        password: upass
                    };
                    const expirationTime = new Date
                        (new Date().getTime() + 6000000);
                    //store data in cookies
                    Cookies.set('vauth', JSON.stringify
                        (userData), { expires: expirationTime });
                }

                //session handling code
                const userSessionData = {
                    vuserfullname: res.data.VenderName
                };
                const sessionexpirationTime = new Date(new Date().getTime() + 60000);

                //store data in session

                sessionStorage.setItem("vsessionauth", JSON.stringify(userSessionData),
                sessionexpirationTime);


                const root = ReactDOM.createRoot(document.getElementById("root"));

                var obj = {
                    vfname: res.data.VenderName,
                    vpicname: res.data.VPicName,
                    vid: res.data.Vid
                }

              
               alert("Login Successfully "+obj.vfname)
                root.render(<VenderHome data={obj}/>)
            }
            else {
                alert("Invalid Id/Password");
            }
        });
    }
    const handleIsRemember = () => {
        setIsChecked(true);
    }

    const handleRegister = () => {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VenderReg />)
    }

    return (
        <div>
           
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="border rounded shadow p-5 bg-white" style={{ width: "100%", maxWidth: "450px" }}>
      <h2 className="text-center mb-4">🤖👨‍💻 Vendor Login 👨‍💻🤖</h2>

      {/* User ID input */}
      <div className="mb-3">
        <label className="form-label fw-bold">User Id</label>
        <input
          type="text"
          value={uid}
          onChange={handleUIdText}
          placeholder="Enter your User ID"
          className="form-control"
        />
      </div>

      {/* Password input */}
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

      {/* Remember Me checkbox */}
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

      {/* Login button */}
      <div className="d-grid mb-3">
        <button type="button" className="btn btn-primary" onClick={handleLoginButton}>
          Login
        </button>
      </div>

      {/* Register link */}
      <div className="text-center">
        <p className="mb-2">Don't have an account?</p>
        <button type="button" className="btn btn-outline-danger" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  </div>


  
        </div>
    )

}
export default VenderLogin;
