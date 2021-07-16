const router = require('express').Router();
const { Recipe, Diet } = require('../db.js');
const fetch = require('node-fetch')
const {Op} = require('sequelize')
require('dotenv').config()

//MY_API_KEY= e56ac4f1877d486fbd6d3af0cefa18d7 MIA ACORDATE DE BORRAR LA DE MATI
const{ MY_API_KEYS } = process.env;

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
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${MY_API_KEYS}`);
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
                    image:recipe.image?recipe.image:'../images/defaultImage.jpg',
                    diets:recipe.diets.map(diet=>diet.name)
                })
            })
            if(recipesDB.length>99){
                res.json(recipesDB)
            }
            else{
                let numbers= 100 - recipesDB.length
                let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&number=${numbers}&addRecipeInformation=true&apiKey=${MY_API_KEYS}`)
                response = await response.json()
                if(recipesDB.length<1 && response.totalResults===0){
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
                    image:recipe.image?recipe.image:'../images/defaultImage.jpg',
                    diets:recipe.diets.map(diet=>diet.name)
                })
            })
            if(arrDB.length>99){
                res.json(arrDB)
            }else{
                let numbers= 100 - recipesDB.length
                let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=${numbers}&addRecipeInformation=true&apiKey=${MY_API_KEYS}`)
                response = await response.json()
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
    }
    catch{
        res.status(404).send("An error ocurred")
    }
});

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

router.post('/recipe', async function(req,res){
    const {title,summary,spoonacularScore,healthScore,instructions,diets} = req.body
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