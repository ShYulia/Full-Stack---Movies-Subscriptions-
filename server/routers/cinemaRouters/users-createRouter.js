const express = require("express");
const cinemaBLL = require('../../BLL/cinemaBLL/usersBLL');


const router = express.Router();
router.route("/").post(async(req,res) => {
    const data = req.body 
    const result = await cinemaBLL.createNewPassword(data)
    if (result!== null){
        res.json(result)
    }else res.status(401).send('error')
})

module.exports = router