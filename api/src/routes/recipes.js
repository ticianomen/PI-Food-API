const router = require('express').Router();
const { Recipe, Diet } = require('../db.js');
const fetch = require('node-fetch')
const {Op} = require('sequelize')
require('dotenv').config()

const{ MY_API_KEYS } = process.env;

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

router.get('/recipes/:id', async function(req,res){
    let { id } = req.params;
    try{
        let dietDB = await Recipe.findByPk(id,{include: Diet})
        let arrDB ={
            image : dietDB.image,
            title : dietDB.title,
            dishTypes : dietDB.dishTypes,
            diets : dietDB.diets.map(diet=>diet.name),
            summary : dietDB.summary,
            spoonacularScore : dietDB.spoonacularScore,
            healthScore : dietDB.healthScore,
            instructions : dietDB.instructions,
        }
        res.json(arrDB)
    }
    catch{
        try{
            let response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${MY_API_KEYS}`);
            let recipe = await response.json();
            let data = {
                image : recipe.image,
                title : recipe.title,
                dishTypes : recipe.dishTypes,
                diets : recipe.diets,
                summary : recipe.summary?recipe.summary.replace(/<[^>]*>?/gm, ''):"This recipe doesn't have a summary",
                spoonacularScore : recipe.spoonacularScore,
                healthScore : recipe.healthScore,
                instructions : recipe.instructions?recipe.instructions.replace(/<[^>]*>?/gm, ''):"This recipe doesn't have instructions",
            }
            res.status(200).send(data)
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
    try{
        if(name){          
            let recipesDB = await Recipe.findAll({
                limit: 100,
                include: Diet,
                where: { 
                    title : {
                        [Op.substring]: name
                    } 
                },
            })
            let arrDB =[]
            recipesDB.map(recipe=>{
                arrDB.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image,
                    diets:recipe.diets.map(diet=>diet.name)
                })
            })
            if(recipesDB.length>99){
                res.json(recipesDB)
            }
            else{
                let numbers= 100 - arrDB.length
                let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&number=${numbers}&addRecipeInformation=true&apiKey=${MY_API_KEYS}`)
                response = await response.json()
                if(arrDB.length<1 && response.totalResults && response.totalResults===0){
                    res.status(404).send("No hay recetas que coincidan con ese nombre")
                }else{
                    let arrRes=[]
                    response.results.map(recipe=>arrRes.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image,
                    diets:recipe.diets
                }))
                    res.json(arrDB.concat(arrRes))
                }
            }
        }else{
            
            let recipesDB = await Recipe.findAll({include: Diet})
            let arrDB =[]
            recipesDB.map(recipe=>{
                arrDB.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image,
                    diets:recipe.diets.map(diet=>diet.name)
                })
            })
            if(arrDB.length>99){
                res.json(arrDB)
            }else{
                let numbers= 100 - arrDB.length
                let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=${numbers}&addRecipeInformation=true&apiKey=${MY_API_KEYS}`)
                response = await response.json()
                let arrRes=[]
                if(response){
                    response.results.map(recipe=>arrRes.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image,
                    diets:recipe.diets
                }))
                }
                
                res.json(arrDB.concat(arrRes))
            }
        }
    }
    catch{
        res.status(404).send("An error ocurred")
    }
});

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

router.post('/recipe', async function(req,res){
    const {title,summary,spoonacularScore,healthScore,instructions,diets,image} = req.body
    try{
    let [recipe] = await Recipe.findOrCreate({where:{title,summary,spoonacularScore,healthScore,instructions}})
    recipe.setDiets(diets)
    return res.status(200).json(recipe)
    }
    catch{
        res.status(404).send("An error ocurred")
    }
});

module.exports = router;