import React, { useEffect, useState } from "react";
import axios from "axios";
import cart from "../img.jpg"
import ReactDOM from "react-dom/client";
import Bill from "../Customer/Bill";

function ProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);
    const [vlist, setVList] = useState([]);

    var cname = "";

    useEffect(() => {
        axios.get("http://localhost:9669/product/showproduct").then((res) => {
            setPList(res.data);
        }).catch((err) => {
            alert(err);
        });
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
        axios.get("http://localhost:9669/vender/getvendercount").then((res) => {
            setVList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }, []);

    const handleBuyButton = (evt) => {
        var pid = parseInt(evt);
        var status = "";
        axios.get("http://localhost:9669/product/showproductstatus/" + pid).then((res) => {
            status = res.data.status;
            if (status == "Active") {
                setItemCount(itemcount + 1)
                plist.map((item) => {
                    if (item.pid == evt) {
                        selitems.push(item);
                    }
                })
            }
            else {
                alert("Product Out of Stock");
            }
        }).catch((err) => {
            alert(err);
        })
    }

    const handleActiveButton = (evt) => {
        var pid = parseInt(evt);
        var status = "Active";
        axios.put("http://localhost:9669/product/updateproductstatus/" + pid + "/" + status).then((res) => {
            alert("Product Status Update");
        }).catch((err) => {
            alert(err);
        });
    }

    const handleInActiveButton = (evt) => {
        var pid = parseInt(evt);
        var status = "Inactive";
        axios.put("http://localhost:9669/product/updateproductstatus/" + pid + "/" + status).then((res) => {
            alert("Product Status Updated");
        }).catch((err) => {
            alert(err);
        });
    }

    const handleCheckButton = () => {
        if (selitems.length <= 0) {
            alert("Please Buy Some Product")
        }
        else {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;
            // var ccid = 1;
            var obj = {
                selitems: selitems,
                cid: ccid
            };
            root.render(<Bill data={obj}></Bill>)
        }
    }

    const handleSearch = (evt) => {
        if (evt.target.value > 0) {
            axios.get("http://localhost:9669/product/showproductbycatgid/" + evt.target.value).then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            })
        } else {
            axios.get("http://localhost:9669/product/showproduct").then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
        }
    }

    const handleSearchByVender = (evt) => {
        if (evt.target.value > 0) {
            axios.get("http://localhost:9669/product/showproductbuvender/" + evt.target.value).then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
        } else {
            axios.get("http://localhost:9669/product/showproduct").then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
        }
    }
    return (
       
            <div className="container-fluid min-vh-100 bg-light py-4">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Customer Id {props.data}</h2>
                </div>
        
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <img src={cart} height={50} width={50} className="me-2" alt="cart" />
                    <span className="me-3 fw-bold">{itemcount}</span>
                    <button type="submit" onClick={handleCheckButton} className="btn btn-primary">CheckOut</button>
                </div>
        
                <div className="row justify-content-center mb-4">
                    <div className="col-md-4 mb-2">
                        <label className="form-label fw-bold">Search by Category</label>
                        <select className="form-select" onClick={handleSearch}>
                            <option value="0">All</option>
                            {
                                pcatglist.map((pcatgitem) => (
                                    <option value={pcatgitem.PCatgId} key={pcatgitem.PCatgId}>{pcatgitem.PCatgName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Search by Vendor</label>
                        <select className="form-select" onClick={handleSearchByVender}>
                            <option value="0">All</option>
                            {
                                vlist.map((vitem) => (
                                    <option value={vitem.Vid} key={vitem.Vid}>{vitem.VenderName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
        
                <div className="text-center mb-3">
                    <h4 className="fw-semibold">Product List</h4>
                </div>
        
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Offer Price</th>
                                <th>Category Name</th>
                                <th>Photo</th>
                                <th>Status</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                plist.map((item) => (
                                    <tr key={item.pid}>
                                        <td>{item.pid}</td>
                                        <td>{item.pname}</td>
                                        <td>{item.pprice}</td>
                                        <td>{item.oprice}</td>
                                        <td>
                                            {
                                                pcatglist.map((citem) => {
                                                    if (item.pcatgid == citem.PCatgId) {
                                                        cname = (citem.PCatgName)
                                                    }
                                                })
                                            }
                                            {cname}
                                        </td>
                                        <td>
                                            <img src={"http://localhost:9669/product/getproductimage/" + item.ppicname}
                                                height={100} width={100} alt="product" className="img-thumbnail" />
                                        </td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleActiveButton(item.pid)}>Active</button>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleInActiveButton(item.pid)}>Inactive</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-info btn-sm" onClick={() => handleBuyButton(item.pid)}>Buy</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
        
} export default ProductList;