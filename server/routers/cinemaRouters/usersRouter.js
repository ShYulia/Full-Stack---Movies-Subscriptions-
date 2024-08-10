const express = require("express");
const usersBLL = require("../../BLL/cinemaBLL/usersBLL");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require ('../../middlewares/auth')

router.get(('/') ,auth, async(req,res) =>{
    try {
        const users = await usersBLL.getAll()
        res.json(users)
    }catch(e){
        res.status(400).json("Error!"); 
    }
});

router.get(("/:id"), auth, async (req, res) => {
  const {id} = req.params

  try {
      const user = await usersBLL.getUser(id)
      res.json(user)
  }catch(e){
      res.status(400).json("Error!"); 
  }
});

router.post("/", auth, async (req, res) => {
 
    try {
      const obj = req.body;
      console.log(obj)
      const user = await usersBLL.createUser(obj);
      res.json(user);
    } catch (e) {
      res.status(400).json("Error!");
    }
 
});

router.put(('/:id') ,auth, async(req,res) => {

    try {
      const obj = req.body;
      const {id} = req.params
      const user = await usersBLL.updateUser(id,obj);
      res.json(user);
    } catch (e) {
      res.status(400).json("Error!");
    }
});


router.delete(('/:id') , auth, async(req,res) =>{
    const {id} = req.params

        try{
          const user = usersBLL.deleteUser(id)
        res.json(user)
        }catch(e) {
            res.status(400).json('Error!')
        }
})


module.exports = router;
