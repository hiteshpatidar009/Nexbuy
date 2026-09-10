
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 9669;

const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");

// Routes
const productCatgRoute = require("./admin/productcatg.route.js");
const StateRoute = require("./admin/state.route.js");
const CityRouter = require("./admin/city.route.js");
const VenderRouter = require("./vender/vender.router.js");
const ProductRoute = require("./Product/Product.route.js");
const CustomerRoute = require("./customer/customer.route.js");
const paymentdetailsRoute = require("./bills/paymentdetails.router.js");
const billRoute = require("./bills/bills.router.js");
const paymentRoutes = require("./payment.js");

// --------------------------------------------------
// CORS CONFIGURATION
// --------------------------------------------------

const allowedOrigins = [
    "https://nexbuy1.vercel.app","http://localhost:3000"
];

const corsOptions = {
    origin: function (origin, callback) {

        // Allow requests without an origin
        // (Postman, mobile apps, server-to-server requests)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },

    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],

    credentials: true
};

// Apply CORS before routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// --------------------------------------------------
// BODY PARSER
// --------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------------------------------
// ROUTES
// --------------------------------------------------

app.use("/productcatg", productCatgRoute);
app.use("/state", StateRoute);
app.use("/city", CityRouter);
app.use("/vender", VenderRouter);
app.use("/product", ProductRoute);
app.use("/customer", CustomerRoute);
app.use("/paymentdetails", paymentdetailsRoute);
app.use("/bill", billRoute);
app.use("/payment", paymentRoutes);

// --------------------------------------------------
// HOME / HEALTH CHECK
// --------------------------------------------------

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "Nexbuy API"
    });
});

// --------------------------------------------------
// MONGODB CONNECTION
// --------------------------------------------------

const mongoUri = process.env.MONGODB_URI || config.URL;

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Cannot connect to the database:", err.message);
    });

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;

