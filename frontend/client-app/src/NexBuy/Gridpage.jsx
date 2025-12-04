import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Gridpage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import VenderLogin from "../vender/VenderLogin"
import ReactDOM from "react-dom/client";
import ainexbuy from "./nexPhoto/nexbuymain.mp4"

function Gridpage() {
  const [displayText, setDisplayText] = useState("");

  const handleloginbutton=()=>{

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VenderLogin/>)
  }

  const text = `🛍️ Have great products to offer? \n Let the world discover your brand and explore what makes your store special.\n
🌍 Expand your reach and boost your sales by connecting with thousands of potential customers across the country — all through NexBuy.\n
✅ Become a verified vendor on NexBuy today and turn your products into profit with our easy-to-use, seller-friendly platform.`;


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
    <div>
      <Container>
        <Row>
          <Col className="hovemecol"
            style={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: 'pre-line', fontSize: '20px' ,
              transition: 'all 0.7s ease'
              
            }}
          >
            {displayText}
          </Col>
          <Col className="hovemecol"
            style={{
                marginLeft:"45px",
                height: "400px",
                display: "flex",
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                transition: 'all 0.7s ease',
                
            }}
          > 
          <h2 className="vendor-invite-label" style={{ marginBottom: '20px' }}>
          🛒 Vendor Registration / Sell Your Product
          </h2> 
          
            <button onClick={handleloginbutton} className="circle-btn" >Sell</button>
            
          </Col>
        </Row>
      </Container>
           {/* video for full page  */}
           <div >
          <video id='ainexbuy' autoPlay muted loop controls>
          <source src={ainexbuy} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
       </div>
    </div>
  );
}

export default Gridpage;
