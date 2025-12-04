import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./venderReg.css"
import venderVed1 from "./VenderappPhoto/vendersmall1.mp4"
import VenderLogin from "./VenderLogin";
import ReactDOM from "react-dom/client";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function VenderReg() {
  const [vuserid, setVUserId] = useState("");
  const [vuserpass, setVUserPass] = useState("");
  const [vendername, setVenderName] = useState("");
  const [vaddress, setVAddress] = useState("");
  const [vcontact, setVContact] = useState("");
  const [vemail, setVEmail] = useState("");
  const [vpicname, setVPicName] = useState("");
  const [vid, setVId] = useState("");
  const [imgae, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");

  const handleVUserIdText = (evt) => {
    setVUserId(evt.target.value);
  };

  const handleVUserPassText = (evt) => {
    setVUserPass(evt.target.value);
  };

  const handleVenderNameText = (evt) => {
    setVenderName(evt.target.value);
  };

  const handleVAdderssText = (evt) => {
    setVAddress(evt.target.value);
  };

  const handleVContactText = (evt) => {
    setVContact(evt.target.value);
  };

  const handleVEmailText = (evt) => {
    setVEmail(evt.target.value);
  };

  const handleVidText = (evt) => {
    setVId(evt.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9669/vender/getvendercount/")
      .then((res) => {
        setVId(res.data.length + 1);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleRegisterButton = () => {
    var obj = {
      VUserId: vuserid,
      VUserPass: vuserpass,
      VenderName: vendername,
      VAddress: vaddress,
      VContact: vcontact,
      VEmail: vemail,
      VPicName: vpicname,
      Vid: vid,
      Status: "active",
    };

    console.log("Sending Data", obj);

    axios
      .post("http://localhost:9669/vender/register/", obj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  //browser and save image code

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("file", imgae.data);
    const response = await fetch(
      "http://localhost:9669/vender/savevenderimage",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response) {
      if (response.statusText == "ok") {
        setStatus("File Uploaded Succesfully");
      } else {
        setStatus("Failed to Upload File");
      }
    }
  };

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    };
    setImage(img);
    setVPicName(evt.target.files[0].name);
  };
  const handleLogin = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VenderLogin />);
  };
  /////////////.........................********************************............................\\\\\\\\\\\\\\\
  // Custom CSS

  const [displayText, setDisplayText] = useState("");
  const text = "💁🏻★  Welcome To Vendor Registration 💁🏻★";

  useEffect(() => {
    let currentText = "";

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        currentText += text.charAt(i);
        setDisplayText(currentText);
      }, i * 100);
    }
  }, []);

  return (
    <>
    <div> 
  <video autoPlay muted loop id="myVideo">
    <source src={venderVed1} type="video/mp4" />
    Your browser does not support HTML5 video.
  </video>
</div>

    <div id="venderimg1" >
        
      <center>
        <h1 style={{marginTop:"0px"}} >{displayText}</h1>

        <Form style={{marginTop:"60px"}}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
           Vendor Id
            </Form.Label>
            <Col sm={1}>
            {vid}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            User Id
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" placeholder="User Id"  onChange={handleVUserIdText} />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="password" placeholder="Password"  onChange={handleVUserPassText} />
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Vender Name
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" placeholder="Vender Name" onChange={handleVenderNameText}  />
            </Col>
          </Form.Group>

          
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Address
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" placeholder="Address" onChange={handleVAdderssText} />
            </Col>
          </Form.Group>


          
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Contact no.
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="number" placeholder="Contact no." onChange={handleVContactText} />
            </Col>
          </Form.Group>



          
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Email
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="email" placeholder="Email" onChange={handleVEmailText} />
            </Col>
          </Form.Group>
          {/* Photo */}

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Select Photo
            </Form.Label>
            <Col sm={4}>
            
                                <input type="file" onChange={handleFileChange} name="file" />
                                <img src={imgae.preview} width="100" height="100" />
                                <Button variant="secondary" type="submit" onClick={handleSubmit} >Upload Vender Photo</Button>
            </Col>
          </Form.Group>
          
         


          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 4, offset: 2 }}>
            
            <Button variant="success" type="submit" onClick={handleRegisterButton}>Continue</Button>
            <Button style={{marginLeft:"100px"}} variant="warning" onClick={handleLogin} >Login </Button>
            </Col>
          </Form.Group>
        </Form>

        {/* <div>
                    <table border={2}>
                        <tr>
                            <td>Vender Id</td>
                            <td>{vid}</td>
                        </tr>

                        <tr>
                            <td>User Id</td>
                            <td>
                                <input type="number" onChange={handleVUserIdText} />
                            </td>
                        </tr>

                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" onChange={handleVUserPassText} />
                            </td>
                        </tr>

                        <tr>
                            <td>Vender Name</td>
                            <td>
                                <input type="text" onChange={handleVenderNameText} />
                            </td>
                        </tr>

                        <tr>
                            <td>Address</td>
                            <td>
                                <input type="text" onChange={handleVAdderssText} />
                            </td>
                        </tr>

                        <tr>
                            <td>Contact</td>
                            <td>
                                <input type="number" onChange={handleVContactText} />
                            </td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="email" onChange={handleVEmailText} />
                            </td>
                        </tr>

                        <tr>
                            <td>Select Photo</td>
                            <td>
                                <input type="file" onChange={handleFileChange} name="file" />
                                <img src={imgae.preview} width="100" height="100" />
                            </td>
                        </tr>

                        <tr>
                            <td>Click To Upload Vender Photo</td>
                            <td>
                                <button type="submit" onClick={handleSubmit}>Upload</button>
                            </td>
                        </tr>

                        <tr>
                            <td><button type="submit" onClick={handleRegisterButton}>Register</button></td>
                            <td><button type="submit" onClick={handleLogin}>Login</button></td>
                        </tr>

                    </table>
                </div> */}
      </center>
    </div>
    </>
  );
}

export default VenderReg;
