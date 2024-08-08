const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require('../../middlewares/auth')
const membersBLL = require('../../BLL/subscriptionsBLL/membersBLL')
require('dotenv').config({path:".env"})
const router = express.Router();



router.get(('/') ,auth, async(req,res) =>{

        try{
        const members = await membersBLL.getMembers()
        res.json(members)
        }catch(e) {
            res.status(400).json('Error!')
        }
    
    router.delete(('/:id') ,auth, async(req,res) =>{
        const {id} = req.params
            try{
            
            const member = await membersBLL.deleteMember(id)
            res.json(member)
            }catch(e) {
                res.status(400).json('Error!')
            }
       
    })
   
})


router.get(('/:id') ,auth, async(req,res) =>{
    const {id} = req.params
 
        try{
        const member = await membersBLL.getMember(id)
        res.json(member)
        }catch(e) {
            res.status(400).json('Error!')
        }
  
  
})


router.put(('/:id') ,auth, async(req,res) =>{
    const {id} = req.params

        try{
      
        const obj = req.body 
        const member = await membersBLL.updateMember(id, obj)
        res.json(member)
        }catch(e) {
            res.status(400).json('Error!')
        }
   
})

router.post(('/') ,auth, async(req,res) =>{
    
    const {id} = req.params
   
        try{
        const obj = req.body 
        const member = await membersBLL.createMember(obj)
        res.json(member)
        }catch(e) {
            res.status(400).json('Error!')
        }
   
})


module.exports = router