import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerMgt() {
    const [customerlist, setCustomerList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9669/customer/getcustomercount")
            .then((res) => setCustomerList(res.data))
            .catch((err) => {
                alert(err);
            });
    }, []);

    const handleActiveButton = (cid) => {
        var email = "";
        axios.get("http://localhost:9669/customer/getcustomerdetails/" + cid)
            .then((res) => {
                email = res.data.CEmail;
                alert("Customer Email: " + email);

                var newstatus = "Active";
                axios.put("http://localhost:9669/customer/customermanage/" + cid + "/" + newstatus)
                    .then((res) => {
                        alert(res.data);
                        var mailto = email;
                        var subject = "Login activation";
                        var message = "Your ID has been successfully activated by the admin. You can now login.";

                        axios.get("http://localhost:9669/emailactivation/sendemails/" + mailto + "/" + subject + "/" + message)
                            .then((res) => {
                                alert(res.data);
                            }).catch(err => {
                                alert(err);
                            });
                    }).catch(err => {
                        alert(err);
                    });
            });
    };

    const handleInActiveButton = (cid) => {
        var email = "";
        axios.get('http://localhost:9669/customer/getcustomerdetails/' + cid)
            .then((res) => {
                email = res.data.CEmail;
                alert("Customer Email: " + email);

                var newstatus = "Inactive";
                axios.put("http://localhost:9669/customer/customermanage/" + cid + "/" + newstatus)
                    .then((res) => {
                        alert(res.data);
                        var mailto = email;
                        var subject = "Login deactivation";
                        var message = "Your ID has been successfully deactivated by the admin. You cannot login.";

                        axios.get("http://localhost:9669/emailactivation/sendemails/" + mailto + "/" + subject + "/" + message)
                            .then((res) => {
                                alert(res.data);
                            }).catch(err => {
                                alert(err);
                            });
                    }).catch(err => {
                        alert(err);
                    });
            });
    };

    return (
        <div className="container py-4">
            <h3 className="text-center fw-bold mb-4">Customer List</h3>
            <div className="table-responsive">
                <table className="table table-bordered table-striped text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerlist.map((item) => (
                                <tr key={item.Cid}>
                                    <td>{item.Cid}</td>
                                    <td>{item.CustomerName}</td>
                                    <td>{item.Status}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={() => handleActiveButton(item.Cid)}>Activate</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleInActiveButton(item.Cid)}>Deactivate</button>
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

export default CustomerMgt;
