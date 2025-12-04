const express = require("express");
const customerRoute = express.Router();
const Customer = require("./customer.modul")
const multer = require("multer");
const nodemailer = require("nodemailer");

function sendGMail(mailto) {
    console.log("mail:-" + mailto);

    res.status(200).json({ response: "Mail Sent" });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "bsmernwala@gmail.com",
            pass: "necc umnw wnpi bmzy",
        },
    });
    //console.log(req.body.email);
    const mailOptions = {
        from: "hiteshpatidar009@gmail.com",
        to: mailto,
        subject: "Register Success",
        text: "Dear Custmer, Your Registeration is Sucessfully done but it is in"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

//Customer registration code

customerRoute.route("/register").post((req, res) => {
    var customer = new Customer(req.body);
    customer.save().then(customer => {
        if (customer != null) {
           // sendGMail(req.body.CEmail);
            res.send("Registration Successfull");
            res.send();
        }
        else {
            res.send("Registration Failed");
            res.end();
        }
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

//login

customerRoute.route("/login").post((req, res) => {
    var id = req.body.CUserId;
    var pass = req.body.CUserPass;
    Customer.findOne({ $and: [{ "CUserId": id }, { "CUserPass": pass }] }).then(customer => {
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    });
});

//get image

customerRoute.route("/getimage/:cpicname").get(function(req , res) {
    res.sendFile("/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/customer/CustomerImages/"+req.params.cpicname)
});

//image save

const st = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/customer/CustomerImages/" );
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: st });
customerRoute.post("/savecustomerimage", upload.single("file"), (req, res) => {
    res.json({})
})

//get customer for count

customerRoute.route("/getcustomercount").get((req, res) => {
    Customer.find().then((customer) => {
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    })
});

//get customer details by id

customerRoute.route("/getcustomerdetails/:cid").get((req, res) => {
    var id = req.params.cid;
    Customer.findOne({ "Cid": id }).then(customer => {
        
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    })
})

//get customer list

customerRoute.route("/getcustomerlist").get((req, res) => {
    var id = req.params.cid;
    Customer.find().then(customer => {
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    })
});

//enable disable customer by admin

customerRoute.route("/customermanage/:cid/:status").put((req, res) => {
    Customer.updateOne({ "Cid": req.params.cid }, { "Status": req.params.status }).then(vender => {
        res.send("Customer Status Updated Successfully");
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

module.exports = customerRoute;