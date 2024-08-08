const express = require("express");
const loginBLL = require('../../BLL/cinemaBLL/loginBLL');
require('dotenv').config({path:".env"})
const jwt = require("jsonwebtoken");

const router = express.Router();
router.route("/").post(async(req,res) => {
    const data = req.body 
    const userData = await loginBLL.getLogInUser(data)
    if (userData !== null && userData.remainingTime > 0){
        const accessToken= jwt.sign({id:userData.id},process.env.SECRET_KEY,  { expiresIn: `${userData.remainingTime}m` })
        const result = {
            accessToken:accessToken,
            _id:userData._id,
            remainingTime: userData.remainingTime,
            permissions:userData.permissions,
            role:userData.role
        }
        res.json(result)
    }else res.status(401).send('error')
})

module.exports = router