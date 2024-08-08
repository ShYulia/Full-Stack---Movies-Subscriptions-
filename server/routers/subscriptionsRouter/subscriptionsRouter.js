const express = require("express");
const jwt = require("jsonwebtoken");
const subsBLL = require('../../BLL/subscriptionsBLL/subsBLL')
require('dotenv').config({path:".env"})
const router = express.Router();
const auth = require('../../middlewares/auth')


router.get(('/') ,auth, async(req,res) =>{
    const { memberId, movieId } = req.query;

        if (memberId) {
        try{
        const movies = await subsBLL.getWatchedMovies(memberId)
        res.json(movies)
       
        }catch(e) {
            res.status(400).json('Error!')
        }
    } if( movieId)  {
        try{
            const members = await subsBLL.getListOfMembers(movieId)
          
            res.json(members)
        }catch (e){
            res.status(400).json('Error!')  
        }
      
    }

})

router.post(('/') ,auth, async(req,res) =>{

  
        try{
        const obj = req.body 
        const sub = await subsBLL.createSub(obj)
        res.json(sub)
        }catch(e) {
            res.status(400).json('Error!')
        }

})

router.patch(('/:id'),auth, async(req,res) => {
   
        try {
            const {id} = req.params
            const obj = req.body
            
            const result = await subsBLL.updateSub(id,obj)
           res.status(201).json(result)
          }
          catch(error) {
            console.log(error)
            res.status(400).json('Error!')
        }    
  
})

module.exports = router