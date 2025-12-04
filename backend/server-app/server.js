//server.js file is used to connect route ,model,and database
const express =require ("express");
const app = express();
const bodyParser = require("body-parser");
const PORT=9669 ;
const cors= require("cors")
const mongoose =require("mongoose");
const config = require("./DB.js");
const productCatgRoute = require("./admin/productcatg.route.js");
const StateRoute = require ("./admin/state.route.js")
const CityRouter = require ("./admin/city.route.js")
const VenderRouter = require("./vender/vender.router.js")
const ProductRoute = require ('./Product/Product.route.js')
const CustomerRoute =require("./customer/customer.route.js")
const paymentdetailsRoute=require("./bills/paymentdetails.router.js")
const billRoute = require ("./bills/bills.router.js");
const paymentRoutes = require("./payment.js");
// const emailactivationrouter = require ("./email.router.js");
// const emailrouter = require ("./email.router.js");
     

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/productcatg", productCatgRoute);
app.use("/state", StateRoute);
app.use("/city", CityRouter);
app.use("/vender", VenderRouter);
app.use("/product",ProductRoute);
app.use("/customer",CustomerRoute);
app.use("/paymentdetails",paymentdetailsRoute);
app.use("/bill",billRoute);
app.use("/payment", paymentRoutes);
// app.use("/email",emailrouter);
// app.use("/emailactivation",emailactivationrouter);


mongoose.connect(config.URL)
.then(()=>{console.log("Data base is connect "+config.URL)},
    err=>{console.log("Can not connect to the database"+err)}
);
app.listen(PORT,()=>{
    console.log("server is running on Port "+PORT);

})
