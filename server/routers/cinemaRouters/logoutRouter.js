const express = require("express");
const logoutBLL = require('../../BLL/cinemaBLL/logoutBLL');
require('dotenv').config({path:".env"})
const jwt = require("jsonwebtoken");

const router = express.Router();
router.route("/").post(async(req,res) => {
   const data = req.body 
    const result = await logoutBLL.updateRemainingTime(data) 
 res.json(result)
})

module.exports = router