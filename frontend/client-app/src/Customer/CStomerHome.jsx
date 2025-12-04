import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import BillByID from "../Customer/BillByID";
import "./CustomerHome.css";

function CStomerHome(props) {
    const [custname, setCustName] = useState("");
    const [isshowbill, setIsShowBill] = useState(false);
    const [sitems, setSItem] = useState([]);

    const totalAmount = props.data?.selitems?.reduce((acc, item) => acc + item.oprice, 0) || 0;

    useEffect(() => {
        const obj = JSON.parse(sessionStorage.getItem("sessionauth"));
        if (obj) {
            setCustName(obj.userfullname);
        } else {
            alert("Session expired");
        }

        if (props.data?.selitems) {
            setSItem(props.data.selitems);
        }
    }, [props.data]);

    const handleLogOut = () => {
        sessionStorage.removeItem("sessionauth");
        alert("Customer session closed");
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<CustomerLogin />);
    };

    if (!props.data) {
        return <div className="text-center text-danger mt-5">Loading customer data...</div>;
    }

    return (
        <div className="customer-home-container">
            {/* Background Video */}
            <video autoPlay loop muted className="bg-video">
                <source src="/assets/bg-video.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>

            <div className="overlay-content container text-white py-5">
                <div className="text-center mb-4">
                    <h3>Welcome, {props.data.cfname}</h3>
                    <img
                        src={`http://localhost:9669/customer/getimage/${props.data.cpicname}`}
                        alt="Profile"
                        className="rounded-circle mt-2 mb-3"
                        width="120"
                        height="120"
                    />
                    <p><strong>Customer ID:</strong> {props.data.cid}</p>
                    <p><strong>Current User:</strong> {custname}</p>
                </div>

                <div className="text-center mb-4">
                    <button onClick={() => setIsShowBill(!isshowbill)} className="btn btn-info mx-2">
                        Show Bills
                    </button>
                    <button onClick={handleLogOut} className="btn btn-danger mx-2">
                        Logout
                    </button>
                </div>

                <div className="product-section">
                    {isshowbill && <BillByID data={props.data.cid} />}
                </div>

                <div className="billing-section mt-5 text-center">
                    <h4 className="text-warning">Your Selected Products</h4>
                    {sitems.length === 0 ? (
                        <p className="text-muted">No products selected yet.</p>
                    ) : (
                        <>
                            <table className="table table-striped table-dark table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Photo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sitems.map((item) => (
                                        <tr key={item.pid}>
                                            <td>{item.pid}</td>
                                            <td>{item.pname}</td>
                                            <td>₹{item.oprice}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:9669/product/getproductimage/${item.ppicname}`}
                                                    height="80"
                                                    width="80"
                                                    alt={item.pname}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h5 className="mt-3">Total Amount: ₹{totalAmount}</h5>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CStomerHome;
