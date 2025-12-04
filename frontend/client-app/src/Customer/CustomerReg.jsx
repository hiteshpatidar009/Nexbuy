import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerReg() {
  const [cuserid, setCUserId] = useState("");
  const [cuserpass, setCUserPass] = useState("");
  const [customername, setCustomerName] = useState("");
  const [stid, setStId] = useState("");
  const [ctid, setCtId] = useState("");
  const [caddress, setCAddress] = useState("");
  const [ccontact, setCContact] = useState("");
  const [cemail, setCEmail] = useState("");
  const [cpicname, setCPicName] = useState("");
  const [cid, setCId] = useState("");
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState("");
  const [stlist, setStList] = useState([]);
  const [ctlist, setCtList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9669/customer/getcustomercount")
      .then(res => setCId(res.data.length + 1))
      .catch(err => alert("getcustomer " + err));

    axios.get("http://localhost:9669/state/show/")
      .then(res => setStList(res.data))
      .catch(err => alert(err));
  }, []);

  const handleStIdSelect = (evt) => {
    const stateId = evt.target.value;
    setStId(stateId);
    axios.get(`http://localhost:9669/city/showallcitybystate/${stateId}`)
      .then(res => setCtList(res.data))
      .catch(err => alert(err));
  };

  const handleRegisterButton = async () => {
    const obj = {
      CUserId: cuserid,
      CUserPass: cuserpass,
      CustomerName: customername,
      StId: stid,
      CtId: ctid,
      CAddress: caddress,
      CContact: ccontact,
      CEmail: cemail,
      CPicName: cpicname,
      Cid: cid,
      Status: "Inactive"
    };

    axios.post("http://localhost:9669/customer/register/", obj)
      .then((res) => {
        alert(res.data);
        if (res.data === "Registeration Successfull") {
          axios.post(`http://localhost:9669/email/sendemails/${cemail}`)
            .then((res) => alert(res.data))
            .catch((err) => alert(err));
        }
      })
      .catch((err) => alert("Data not Submitted " + err));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch("http://localhost:9669/customer/savecustomerimage", {
      method: "POST",
      body: formData,
    });
    if (response.statusText === "OK") {
      setStatus("File uploaded successfully");
    } else {
      setStatus("Failed to upload File");
    }
  };

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0]
    };
    setImage(img);
    setCPicName(evt.target.files[0].name);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1549880338-65ddcdfd017b")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">📝 Customer Registration</h3>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Customer ID</label>
              <input type="text" className="form-control" value={cid} disabled />
            </div>
            <div className="col">
              <label className="form-label fw-bold">User ID</label>
              <input type="text" className="form-control" onChange={(e) => setCUserId(e.target.value)} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" onChange={(e) => setCUserPass(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Customer Name</label>
            <input type="text" className="form-control" onChange={(e) => setCustomerName(e.target.value)} />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">State</label>
              <select className="form-select" onChange={handleStIdSelect}>
                <option disabled selected>Select State</option>
                {stlist.map((item) => (
                  <option key={item.StId} value={item.StId}>{item.StName}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label fw-bold">City</label>
              <select className="form-select" onChange={(e) => setCtId(e.target.value)}>
                <option disabled selected>Select City</option>
                {ctlist.map((item) => (
                  <option key={item.ctid} value={item.ctid}>{item.ctname}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <input type="text" className="form-control" onChange={(e) => setCAddress(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contact</label>
            <input type="number" className="form-control" onChange={(e) => setCContact(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" onChange={(e) => setCEmail(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Photo</label>
            <input type="file" className="form-control" onChange={handleFileChange} name="file" />
            {image.preview && <img src={image.preview} alt="preview" width="100" height="100" className="mt-2 rounded shadow" />}
          </div>

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-secondary w-50" onClick={handleSubmit}>Upload Photo</button>
            <button className="btn btn-primary w-50" onClick={handleRegisterButton}>Register</button>
          </div>

          {status && <div className="alert alert-info">{status}</div>}
        </form>
      </div>
    </div>
  );
}

export default CustomerReg;
