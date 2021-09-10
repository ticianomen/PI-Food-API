const router = require('express').Router();
const { Diet } = require('../db.js');

const dietsTypes = ["gluten free","ketogenic","vegetarian","lacto ovo vegetarian","dairy free","vegan","pescetarian","paleo","primal","whole30"]


// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos 
// de datos indicados por spoonacular

router.get('/types', async function(req,res){
    let diets= await Diet.findAll()

    if(diets.length<1){
        for (let index = 0; index < dietsTypes.length; index++) {
            await Diet.create({name:dietsTypes[index]})
        }
        diets = await Diet.findAll()
        Diet.sync()
    }
    res.status(200).json(diets)
})

module.exports = router;