import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import axios from 'axios';
import ReactDOM from "react-dom/client"
import Bill from "../Customer/Bill"
import Login from "../Customer/CustomerLogin"
import Button from 'react-bootstrap/Button';
import { Badge } from "react-bootstrap";




const ProductCard = () => {
 const [itemcount, setItemCount] = useState(0);
   const [selitems, setSelItems] = useState([]);
   const [pcatglist, setPCatgList] = useState([]);
   const [plist, setPList] = useState([]);
   

   var cname="";


  useEffect(() => {
    axios
      .get("http://localhost:9669/product/showproduct/")
      .then((res) => {
        setPList(res.data);
      })
      .catch((err) => {
        alert("product" + err);
      });

      axios
      .get("http://localhost:9669/productcatg/show")
      .then((res) => {
        setPCatgList(res.data);
      })
      .catch((err) => {
        alert("catagory" + err);
      });
  }, []);

// rcb
const handleBuy = (evt) => {
  var pid = parseInt(evt);
  var status = "";
  axios
    .get("http://localhost:9669/product/showproductstatus/" + pid)
    .then((res) => {
      status = res.data.status;
      if (status == "Active") {
        // 
        plist.map((item) => {
          if (item.pid == evt) {
            selitems.push(item);
          }
        });
       
        if (selitems.length <= 0) {
          alert("Buy some product");
        } else {
          const isLoggedIn = localStorage.getItem("isLoggedIn"); // <-- Check login flag
      
          if (!isLoggedIn) {
            alert("Please login first.");
            const root = ReactDOM.createRoot(document.getElementById("root"));
            // window.location.href = "/login"; // change if your login route differs
    
            const obj = {
              selitems: selitems,
              // cid: ccid,
            };
            root.render(<Login data={obj} />);
    
            return;
          }
       
          const root = ReactDOM.createRoot(document.getElementById("root"));
          // const ccid = props.data;
          const obj = {
            selitems: selitems,
            // cid: ccid,
          };
          
          root.render(<Bill data={obj}></Bill>);
        }


      } else {
        alert("product out of stock");
      }
    })
    .catch((err) => {
      alert("buy product" + err);
    });
};


// csk

  const handleBuyButton = (evt) => {
    var pid = parseInt(evt);
    var status = "";
    axios
      .get("http://localhost:9669/product/showproductstatus/" + pid)
      .then((res) => {
        status = res.data.status;
        if (status == "Active") {
          setItemCount(itemcount + 1);
          plist.map((item) => {
            if (item.pid == evt) {
              selitems.push(item);
            }
          });
        } else {
          alert("product out of stock");
        }
      })
      .catch((err) => {
        alert("buy product" + err);
      });
  };
  
  const handleCheckButton = () => {
    if (selitems.length <= 0) {
      alert("Buy some product");
    } else {
      const isLoggedIn = localStorage.getItem("isLoggedIn"); // <-- Check login flag
  
      if (!isLoggedIn) {
        alert("Please login first.");
        const root = ReactDOM.createRoot(document.getElementById("root"));
        // window.location.href = "/login"; // change if your login route differs

        const obj = {
          selitems: selitems,
          // cid: ccid,
        };
        root.render(<Login data={obj} />);

        return;
      }
   
      const root = ReactDOM.createRoot(document.getElementById("root"));
      // const ccid = props.data;
      const obj = {
        selitems: selitems,
        // cid: ccid,
      };
      
      root.render(<Bill data={obj}></Bill>);
    }
  };
  

  const handleSearch = (evt) => {
    if (evt.target.value > 0) {
      axios
        .get(
          "http://localhost:9669/product/showproductbycatgid/" +
            evt.target.value
        )
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert("search error" + err);
        });
    } else {
      axios
        .get("http://localhost:9669/product/showproduct")
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert("showelse" + err);
        });
    }
  };
  

  return ( <>

{/* <label>{itemcount}</label> */}
       

  
            
            <Button 
              variant="outline-dark"
              className="position-relative cart-button"
              style={{ transition: 'transform 0.2s ease-in-out' , margin:"25px" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              type="submit" onClick={handleCheckButton}
              >
              Cart
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                {itemcount}
              </Badge>

           
          CheckOut
       
            </Button>
           
  {/* card */}
    <div className="container-fluid bg-light">
      <div className="card-grid">
        {plist.map((item, index) => (
          <div className="card product-card" key={index}>
            <img
              src={`http://localhost:9669/product/getproductimage/${item.ppicname}`}
              alt={item.pname}
            />
            <div className="card-body text-center p-3">
              <h5 className="product-title mb-1">{item.pname}</h5>
              <p className="mb-2">
                <span className="price-line me-2">₹{item.pprice}</span>
                <span className="offer-price">₹{item.oprice}</span>
              </p>
              <div className="card-buttons d-flex justify-content-between">
                <button className="btn btn-outline-primary btn-sm w-50 me-2" onClick={() => handleBuyButton(item.pid)}>Add</button>
                <button className="btn btn-success btn-sm w-50" onClick={() => handleBuy(item.pid)} >Buy</button>
              </div>
            </div>
          </div>
        ))}
         </div>
       </div>
     
     
    </>
  );
};

export default ProductCard;
