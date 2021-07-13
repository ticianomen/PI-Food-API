const router = require('express').Router();
const { Recipe } = require('../db.js');
const fetch = require('node-fetch')
require('dotenv').config()

const{ MY_API_KEY } = process.env;

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

router.get('/recipes/:id', async function(req,res){
    const { id } = req.params;
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${MY_API_KEY}`);
    const recipe = await response.json();

    let data = {
        image : recipe.image,
        title : recipe.title,
        dishTypes : recipe.dishTypes,
        diets : recipe.diets,
        summary : recipe.summary,
        spoonacularScore : recipe.spoonacularScore,
        healthScore : recipe.healthScore,
        instructions : recipe.instructions,
    }
    res.status(200).json(data)
});

// GET /recipes?name="...":
// Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query paraeter
// Si no existe ninguna receta mostrar un mensaje adecuado

router.get('/recipes', async function(req,res){
    const{ name } = req.query
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&number=9&apiKey=${MY_API_KEY}`)
    if(response.length<1){
        res.status(404).send("No hay recetas que coincidan con ese nombre")
    }else{
        const data= await response.json()
        res.json(data)
    }
});

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

router.post('/recipe', async function(req,res){
    const {title,summary,spoonacularScore,healthScore,instructions} = req.body
    let recipe = await Recipe.create({title,summary,spoonacularScore,healthScore,instructions})
    return res.status(200).json(recipe)
});

module.exports = router;