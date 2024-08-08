const express = require("express");
const logoutBLL = require("../../BLL/cinemaBLL/logoutBLL");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require ('../../middlewares/auth')

router.post(('/') ,auth, async(req,res) =>{
const data = req.body 
try{
 const result = await logoutBLL.updateRemainingTime(data)
 res.json(result)
}catch(e){
    console.log(e,'error heartbeat router')
    res.status(400).json("Error!");    
}


})
module.exports = router