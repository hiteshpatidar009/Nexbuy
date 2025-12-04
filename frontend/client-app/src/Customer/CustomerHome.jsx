import React, { useEffect, useState } from "react";
import ProductList from "../product/ProductList";
import BillByID from "../Customer/BillByID";
import ReactDOM from "react-dom/client";
import axios from "axios";
import CustomerLogin from "./CustomerLogin";
import "./CustomerHome.css"; 

function CustomerHome(props) {
    const [custname, setCustName] = useState();
    const [isshowplist, setIsShowPlist] = useState(false);
    const [isshowbill, setIsShowBill] = useState(false);
    const [ispaymentdone, SetisPaymentDone] = useState(false);
    const [sitems, setSItem] = useState([]);
    let nextbillid = "";

    const totalAmount = props.data.selitems.reduce((acc, item) => acc + item.oprice, 0);

    useEffect(() => {
        const obj = JSON.parse(sessionStorage.getItem("sessionauth"));
        if (obj !== undefined && obj !== null) {
            setCustName(obj.userfullname);
        } else {
            alert("Session expired");
        }
        if (props.data.selitems) {
            setSItem(props.data.selitems);
        }
    }, [props.data.selitems]);

    const handleShowBills = () => {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<BillByID data={props.data.cid} />);
    };

    const handleLogOut = () => {
        sessionStorage.removeItem("sessionauth");
        alert("Customer session closed");
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<CustomerLogin />);
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    async function SaveBill() {
        try {
            const res = await axios.get("http://localhost:9669/bill/getbillid/");
            nextbillid = parseInt(res.data[0].billid) + 1;
            const date = new Date();
            const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

            for (const item of sitems) {
                const billobj = {
                    billid: nextbillid,
                    billdate: currentDate,
                    cid: props.data.cid,
                    pid: item.pid,
                };
                await axios.post("http://localhost:9669/bill/billsave", billobj);
            }
            return true;
        } catch (err) {
            alert("Error saving bill: " + err);
            return false;
        }
    }

    async function displayRazorpay() {
        if (ispaymentdone) {
            alert("Payment already done");
            return;
        }

        if (sitems.length === 0) {
            alert("Please select at least one product before proceeding to payment.");
            return;
        }

        const saved = await SaveBill();
        if (!saved) return;

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        const myamount = totalAmount * 100;
        const result = await axios.post("http://localhost:9669/payment/orders/" + myamount);

        if (!result) {
            alert("Server error.");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_8CxHBNuMQt1Qn8",
            amount: amount.toString(),
            currency,
            name: "Universal Informatics",
            description: "Test Transaction",
            order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:9669/payment/success", data);
                alert("Message: " + result.data);

                if (result.data === "Payment Successfully Done") {
                    await axios.put("http://localhost:9669/bill/billstatusupdate/" + nextbillid);
                }

                const payData = {
                    ...data,
                    cid: props.data.cid,
                    billid: nextbillid,
                    amount: amount / 100,
                };

                await axios.post("http://localhost:9669/paymentdetails/paymentdetailsave", payData);
                SetisPaymentDone(true);
            },
            prefill: {
                name: "HITESH PATIDAR",
        email: "hiteshpatidar009@gmail.com",
        contact: "8815440451",
            },
            notes: {
                address: "Universal Informatics Indore Pvt. Ltd.",
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
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
                    {/* <button onClick={() => setIsShowPlist(!isshowplist)} className="btn btn-success mx-2">
                        View Products
                    </button> */}
                    <button onClick={() => setIsShowBill(!isshowbill)} className="btn btn-info mx-2">
                        Show Bills
                    </button>
                    <button onClick={handleLogOut} className="btn btn-danger mx-2">
                        Logout
                    </button>
                </div>

                <div className="product-section">
                    {isshowplist && <ProductList data={props.data.cid} />}
                    {isshowbill && <BillByID data={props.data.cid} />}
                </div>

                <div className="billing-section mt-5 text-center">
                    <h4 className="text-warning">Your Selected Products</h4>
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
                                    <td>{item.oprice}</td>
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
                    <button onClick={displayRazorpay} className="btn btn-warning mt-3">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerHome;




