import React, { useEffect, useState } from "react";
import axios from "axios";

function Product(props) {
  const [pid, setPId] = useState();
  const [pname, setPName] = useState("");
  const [pprice, setPPrice] = useState("");
  const [oprice, setOPrice] = useState("");
  const [ppicname, setPPicName] = useState("");
  const [pcatgid, setPCatgId] = useState("");
  const [pcatglist, setPCatgList] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [plist, setPList] = useState([]);

  const vendorid = props.data?.venderid || 0;
  const vendername = props.data?.vendname || "";

  useEffect(() => {
    axios.get("http://localhost:9669/product/getmaxpid")
      .then((res) => setPId(res.data.length + 1))
      .catch((err) => alert(err));

    axios.get("http://localhost:9669/productcatg/show")
      .then((res) => setPCatgList(res.data))
      .catch((err) => alert(err));
  }, []);

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    };
    setImage(img);
    setPPicName(evt.target.files[0].name);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch("http://localhost:9669/product/saveproductimage", {
      method: "POST",
      body: formData,
    });
    setStatus(response.statusText === "OK" ? "File uploaded successfully" : "Failed to upload file");
  };

  const handleSaveButton = () => {
    const obj = {
      pid, pname, pprice, oprice, ppicname, pcatgid,
      vid: vendorid,
      status: "Active",
    };

    axios.post("http://localhost:9669/product/saveproduct/", obj)
      .then(() => alert("Product Saved"))
      .catch((err) => alert(err));
  };

  const handleShowButton = () => {
    axios.get(`http://localhost:9669/product/showproductbyvendor/${vendorid}`)
      .then((res) => setPList(res.data))
      .catch((err) => alert(err));
  };

  const handleNewButton = () => {
    axios.get("http://localhost:9669/product/getmaxpid")
      .then((res) => {
        setPId(res.data.length + 1);
        setPName("");
        setPPrice("");
        setOPrice("");
        setPPicName("");
        setImage({ preview: "", data: "" });
        setPCatgId("");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h4 className="text-primary">Vendor: {vendername} (ID: {vendorid})</h4>
        <h3 className="bg-success text-white p-2 rounded">Add New Product</h3>
      </div>

      <div className="card shadow p-4 mb-5 mx-auto" style={{ maxWidth: "700px" }}>
        <form>
          <div className="mb-3">
            <label className="form-label">Product ID</label>
            <input type="text" className="form-control" value={pid} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" value={pname} onChange={(e) => setPName(e.target.value)} />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Price</label>
              <input type="number" className="form-control" value={pprice} onChange={(e) => setPPrice(e.target.value)} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Offer Price</label>
              <input type="number" className="form-control" value={oprice} onChange={(e) => setOPrice(e.target.value)} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Product Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
            {image.preview && <img src={image.preview} alt="Preview" className="img-thumbnail mt-2" width="100" />}
            <button className="btn btn-outline-primary btn-sm mt-2" onClick={handleSubmit}>Upload Image</button>
            <p className="text-success mt-1">{status}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" value={pcatgid} onChange={(e) => setPCatgId(e.target.value)}>
              <option value="">Select Category</option>
              {pcatglist.map((item) => (
                <option key={item.PCatgId} value={item.PCatgId}>{item.PCatgName}</option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-warning" onClick={handleNewButton}>New</button>
            <button type="button" className="btn btn-success" onClick={handleSaveButton}>Save</button>
            <button type="button" className="btn btn-primary" onClick={handleShowButton}>Show Products</button>
          </div>
        </form>
      </div>

      {plist.length > 0 && (
        <>
          <h4 className="text-center bg-success text-white p-2 rounded">Product List</h4>
          <div className="row">
            {plist.map((item, index) => {
              const category = pcatglist.find(c => c.PCatgId === item.pcatgid)?.PCatgName || "Unknown";
              return (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`http://localhost:9669/product/getproductimage/${item.ppicname}`}
                      className="card-img-top"
                      alt={item.pname}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.pname}</h5>
                      <p className="text-muted mb-1">Product ID: {item.pid}</p>
                      <p className="mb-1"><strong>Category:</strong> {category}</p>
                      <p>
                        <span className="text-danger text-decoration-line-through me-2">₹{item.pprice}</span>
                        <span className="text-success fw-bold">₹{item.oprice}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
