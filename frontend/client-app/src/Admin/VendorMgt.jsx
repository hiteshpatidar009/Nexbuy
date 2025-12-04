import React, { useState, useEffect } from "react";
import axios from "axios";

function VendorMgt() {
    const [vendorlist, setVendorList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9669/vender/getvendercount")
            .then((res) => {
                setVendorList(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const handleActiveButton = (vid) => {
        const newstatus = "Active";
        axios.put(`http://localhost:9669/vender/vendermanage/${vid}/${newstatus}`)
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleInActiveButton = (vid) => {
        const newstatus = "Inactive";
        axios.put(`http://localhost:9669/vender/vendermanage/${vid}/${newstatus}`)
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="container py-4">
            <h3 className="text-center fw-bold mb-4">Vendor List</h3>
            <div className="table-responsive">
                <table className="table table-bordered table-striped text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Vendor ID</th>
                            <th>Vendor Name</th>
                            <th>Status</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vendorlist.map((item) => (
                                <tr key={item.Vid}>
                                    <td>{item.Vid}</td>
                                    <td>{item.VenderName}</td>
                                    <td>{item.Status}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={() => handleActiveButton(item.Vid)}>Activate</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleInActiveButton(item.Vid)}>Deactivate</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VendorMgt;
