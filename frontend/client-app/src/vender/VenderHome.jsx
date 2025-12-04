import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import VenderLogin from "./VenderLogin";
import "./venderHome.css"
import venderhomevideo from "./VenderappPhoto/venderhome1.mp4"
import Button from 'react-bootstrap/Button';
import Product from "../product/Product"

function VenderHome(props) {
    const [vendname, setVendName] = useState("");
    const [venderid ,setVenderid]=useState("");

    useEffect(() => {
        var obj = JSON.parse(sessionStorage.getItem('vsessionauth'));
        if (obj !== undefined && obj !== null) {
            // alert(obj.vid);
            setVendName(obj.vuserfullname);
           setVenderid(props.data.vid)

        } else {
            alert("Vender Session Expired");
        }
    },[]) 
    // alert("vender id "+ venderid)
    var newoobj={
        vendname:vendname,
        venderid:venderid,
    }

    const handleAddProductButton = () => {

        const root = ReactDOM.createRoot(document.getElementById("root"));
         
         
        root.render(<Product data={newoobj} />)
    }

    const handleLogOut = () => {
        sessionStorage.removeItem("vsessionauth");
        alert("Vender Session Closed");
        const root = ReactDOM.createRoot(document.getElementById("root"));

        root.render(<VenderLogin />);
    }

    return (
        <div>
       

       <center>
                <p>Current Session Running For {vendname}</p>
                <h1>Vender Home Page</h1>
                 </center>
            <video autoPlay muted loop id="vendervideoHome1">
               <source src={venderhomevideo} type="video/mp4" />
                 Your browser does not support HTML5 video.
               </video>


            
                <h1 id="venderid">Vender Id : <span style={{color:"rgb(223, 109, 45)"}} >{props.data.vid}</span></h1>
                <h1 id="welcome">Welcome _<span style={{color:"rgb(99, 140, 109)"}} >{props.data.vfname}</span></h1>
                <img id="picimg" src={"http://localhost:9669/vender/getimage/" + props.data.vpicname } width="300" height="400"/>

                {/* <button className="button" onClick={handleAddProductButton}>Manage Product</button>
                <button className="button" type="submit" onClick={handleLogOut}>Logout</button> */}
                <Button variant="outline-success"className="button" type="submit" onClick={handleAddProductButton}>Manage Product</Button>
                <Button variant="outline-warning"className="button" type="submit" onClick={handleLogOut}>LogOut</Button>

        </div>
    )

}

export default VenderHome;