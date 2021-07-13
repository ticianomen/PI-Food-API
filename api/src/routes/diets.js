const router = require('express').Router();
const { Diet } = require('../db.js');
const fetch = require('node-fetch')
require('dotenv').config()

const dietsTypes = ["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Whole30"]

const{ MY_API_KEY } = process.env;

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos 
// de datos indicados por spoonacular

router.get('/types', async function(req,res){
    let diets= await Diet.findAll()

    if(diets.length<1){
        for (let index = 0; index < dietsTypes.length; index++) {
            Diet.create({name:dietsTypes[index]})
        }
        diets = await Diet.findAll()
    }
    res.status(200).json(diets)
})

module.exports = router;