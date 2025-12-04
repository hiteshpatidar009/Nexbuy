import React, { useState } from "react";
import StateMgt from "./StateMgt";
import City from "./City";
import ProductCatg from "./ProductCatg";
import VendorMgt from "./VendorMgt";
import ShowBills from "./ShowBills";
import ReactDOM from "react-dom/client";
import ProductList from "./ProductList";
import CustomerMgt from "./CustomerMgt";

function AdminHome() {
    const [isstateshow, setIsStateShow] = useState(false);
    const [iscityshow, setIsCityShow] = useState(false);
    const [ispcatgshow, setIsPCatgShow] = useState(false);
    const [isvendershow, setIsVenderShow] = useState(false);
    const [isbillshow, setIsBillShow] = useState(false);
    const [isproductlistshow, setIsProductListShow] = useState(false);
    const [iscustomershow, setIsCustomerShow] = useState(false);

    function togleState() {
        setIsStateShow((isstateshow) => !isstateshow);
    }

    function togleCity() {
        setIsCityShow((iscityshow) => !iscityshow);
    }

    function togleProductCatg() {
        setIsPCatgShow((ispcatgshow) => !ispcatgshow);
    }

    function togleVender() {
        setIsVenderShow((isvendershow) => !isvendershow);
    }

    function togleBill() {
        setIsBillShow((isbillshow) => !isbillshow);
    }

    function togleProductList() {
        setIsProductListShow((isproductlistshow) => !isproductlistshow);
    }

    function togleCustomerList() {
        setIsCustomerShow((iscustomershow) => !iscustomershow);
    }

    function LogOutButtonClick() {
        const root = ReactDOM.createRoot(document.getElementById("root"));
    }

    return (<>
        <div>
            <center>
                <h4>Admin Page</h4>
                <div>
                    <button type="submit" onClick={togleState}>State</button>
                    <button type="submit" onClick={togleCity}>City</button>
                    <button type="submit" onClick={togleProductCatg}>Product Category</button>
                    <button type="submit" onClick={togleVender}>Vender</button>
                    <button type="submit" onClick={togleBill}>Bills</button>
                    <button type="submit" onClick={togleProductList}>Product</button>
                    <button type="submit" onClick={togleCustomerList}>Customer</button>
                    <button type="submit" onClick={LogOutButtonClick}>Logout</button>

                </div>

                {
                    isstateshow && <StateMgt />
                }

                {
                    iscityshow && <City />
                }

                {
                    ispcatgshow && <ProductCatg />
                }

                {
                    isvendershow && <VendorMgt />
                }

                {
                    isbillshow && <ShowBills />
                }

                {
                    isproductlistshow && <ProductList />
                }

                {
                    iscustomershow && <CustomerMgt />
                }
            </center>
        </div>
    </>);

}

export default AdminHome;