const express = require("express");
const auth = require('../../middlewares/auth')
const jwt = require("jsonwebtoken");
const moviesBLL = require('../../BLL/subscriptionsBLL/moviesBLL')
require('dotenv').config({path:".env"})
const router = express.Router();


router.get('/' ,auth, async(req,res) =>{

        try{
        const movies = await moviesBLL.getMovies()
        res.json(movies)
        }catch(e) {
            console.log(e)
            res.status(400).json('Error!')
        } 
   
})

router.get(('/:id') , auth, async(req,res) =>{
    const {id} = req.params

        try{
        const movie = await moviesBLL.getMovie(id)
        res.json(movie)
        }catch(e) {
            res.status(400).json('Error!')
        }
    
})

router.put(('/:id') , auth, async(req,res) =>{
    const {id} = req.params
        try{
   
        const obj = req.body 
        const movie = await moviesBLL.updateMovie(id, obj)
        res.json(movie)
        }catch(e) {
            res.status(400).json('Error!')
        }
})
router.post(('/') ,auth, async(req,res) =>{

        try{
        const obj = req.body 
        const movie = await moviesBLL.createMovie( obj)
        res.json(movie)
        }catch(e) {
            res.status(400).json('Error!')
        }

})

router.delete(('/:id') ,auth, async(req,res) =>{
    const {id} = req.params
        try{
   
        const movie = await moviesBLL.deleteMovie(id)
        res.json(movie)
        }catch(e) {
            res.status(400).json('Error!')
        }
})

module.exports = router