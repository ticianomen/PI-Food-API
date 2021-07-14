const router = require('express').Router();
const { Recipe, Diet } = require('../db.js');
const fetch = require('node-fetch')
const {Op} = require('sequelize')
require('dotenv').config()

const{ MY_API_KEY } = process.env;

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

router.get('/recipes/:id', async function(req,res){
    const { id } = req.params;
    try{
        const dietDB = await Recipe.findByPk(id,{include: Diet})
        res.json(dietDB)
    }
    catch{
        try{
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
        }
        catch{
            res.status(404).send("An error ocurred")
        }
    }
    
});

// GET /recipes?name="...":
// Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query paraeter
// Si no existe ninguna receta mostrar un mensaje adecuado

router.get('/recipes', async function(req,res){
    const{ name } = req.query
    if(name){
        let recipesDB = await Recipe.findAll({
            limit: 9,
            where: { 
                title : {
                    [Op.substring]: name
                } 
            },
        })
        if(recipesDB.length>8){
            res.json(recipesDB)
        }
        else{
            let numbers= 9 - recipesDB.length
            let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&number=${numbers}&apiKey=${MY_API_KEY}`)
            response = await response.json()
            if(recipesDB.length<1 && response.totalResults===0){
                res.status(404).send("No hay recetas que coincidan con ese nombre")
            }else{
                res.json(recipesDB.concat(response.results))
            }
        }
    }else{
        let recipesDB = await Recipe.findAll({ limit: 100 })
        if(recipesDB.length>99){
            res.json(recipesDB)
        }else{
            let numbers= 100 - recipesDB.length
            let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=${numbers}&apiKey=${MY_API_KEY}`)
            response = await response.json()
            res.json(recipesDB.concat(response.results))
        }
    }
});

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

router.post('/recipe', async function(req,res){
    const {title,summary,spoonacularScore,healthScore,instructions,diets} = req.body
    let recipe = await Recipe.create({title,summary,spoonacularScore,healthScore,instructions})
    recipe.setDiets(diets)
    return res.status(200).json(recipe)
});

module.exports = router;