const express= require("express");
const venderRoute =express.Router();
const bodyparser=require("body-parser");
const Vender = require ("./vender.model");
var  fs = require("fs");
const multer = require("multer");

// vender registration code 

venderRoute.route("/register").post((req,res)=>{
    var vender = new Vender(req.body);
    vender.save().then((vender)=>{
        if(vender!==null){
            res.send("Registration Succesfull")

        }else{
            res.send("Registration Failed")
        }
    }).catch((err)=>{
        res.status(400).send("Registration Failed")
    });

})

//Login 

venderRoute.route("/login").post((req,res)=>{
    var id=req.body.vuid;
    var pass=req.body.vupass;
    
    // console.log("userid="+id+"password="+pass);
    Vender.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then((vender)=>{
        
        res.send(vender);
        res.end();

    }).catch(err=>{
        res.send("Something Went Wrong"+err);
        res.end();

    })
})





// Get Image 

venderRoute.route('/getimage/:vpicname').get((req,res)=>{
    
        res.sendFile("/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/vender/venderimg/" + req.params.vpicname);
   
    })

// image save

const st = multer.diskStorage
({
    destination:(req,file,cb)=>{
        cb(null ,"/Users/apple/Documents/Project.js/NexBuy-Project/backend/server-app/vender/venderimg/" )
    },
    filename:(req , file ,cb)=>{
        cb(null ,file.originalname)
    },
    
})
const upload = multer({ storage:st});

venderRoute.post("/savevenderimage", upload.single("file"), (req, res) => {
    console.log('');
    res.send("File Uploaded Successfully");
    res.end();

});




// get  vender for count 

venderRoute.route("/getvendercount").get((req,res)=>{
    Vender.find().then(vender=>{
        res.send(vender);
        res.end();

    }).catch(err=>{
        res.send("Something Went Wrong ");
        res.end();

    })
})

// enable disable vender by admin 

venderRoute.route("/vendermanage/:vid/:status").put((req,res)=>{
    Vender.updateOne({"Vid":req.params.vid},{"status":req.params.status}).then(vender=>{
        res.send("Vender Status Updated Successfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();


    })
});
module.exports=venderRoute;