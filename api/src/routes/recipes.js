const router = require('express').Router();
const { Recipe, Diet } = require('../db.js');
const fetch = require('node-fetch')
const {Op} = require('sequelize')
require('dotenv').config()

const { MY_API_KE }  = process.env
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
            cuisines: dietDB.cuisines,
            summary : dietDB.summary,
            spoonacularScore : dietDB.spoonacularScore,
            healthScore : dietDB.healthScore,
            instructions : dietDB.instructions,
        }
        res.json(arrDB)
    }
    catch{
        try{
            let response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${MY_API_KE}`);
            let recipe = await response.json();
            if(recipe.code != 404){
                let data = {
                    image : recipe.image,
                    title : recipe.title,
                    dishTypes : recipe.dishTypes,
                    cuisines: recipe.cuisines?recipe.cuisines:"",
                    ingredients: recipe.extendedIngredients?recipe.extendedIngredients.map(ingredient=>ingredient.name):'',
                    diets : recipe.diets,
                    summary : recipe.summary?recipe.summary.replace(/<[^>]*>?/gm, ''):'',
                    spoonacularScore : recipe.spoonacularScore,
                    healthScore : recipe.healthScore,
                    instructions : recipe.instructions?recipe.instructions.replace(/<[^>]*>?/gm, ''):'',
                }
                res.status(200).send(data)
            }else{
                return res.status(404).send('Recipe doesnt exists')
            }
        }
        catch{
            res.status(404).send("An error ocurred with the API")
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
            const recipesDB = await Recipe.findAll({
                limit: 100,
                include: Diet,
                where: { 
                    title : {
                        [Op.substring]: name
                    } 
                },
            })
            const arrDB =[]
            recipesDB.map(recipe=>{
                arrDB.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image?recipe.image:"",
                    diets:recipe.diets.map(diet=>diet.name)
                })
            })
            if(recipesDB.length>99){
                res.json(recipesDB)
            }
            else{
                const numbers= 100 - arrDB.length
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&number=${numbers}&addRecipeInformation=true&apiKey=${MY_API_KE}`)
                const respon = await response.json()
                if(arrDB.length<1 && respon.results.length<1){
                    res.status(304).send("No hay recetas que coincidan con ese nombre")
                }else{
                    const arrRes=[]
                    respon.results.map(recipe=>arrRes.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image,
                    diets:recipe.diets
                }))
                    res.json(arrDB.concat(arrRes))
                }
            }
        }else{
            const recipesDB = await Recipe.findAll({include: Diet})
            const arrDB =[]
            recipesDB.map(recipe=>{
                arrDB.push({
                    id:recipe.id,
                    title:recipe.title,
                    image:recipe.image?recipe.image:"",
                    diets:recipe.diets.map(diet=>diet.name)
                })
            })
            if(arrDB.length>99){
                res.json(arrDB)
            }else{
                try{
                    let numbers= 100 - arrDB.length
                    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=${numbers}&addRecipeInformation=true&apiKey=${MY_API_KE}`)
                    const resp =  await response.json()
                    const arrRes=[]

                    if(resp){
                        resp.results.map(recipe=>arrRes.push({
                        id:recipe.id,
                        title:recipe.title,
                        image:recipe.image,
                        diets:recipe.diets
                    }))
                    }
                    res.status(200).json(arrDB.concat(arrRes))  
                }
                catch{
                    if(res.length>0){
                        res.status(200).status(arrDB)
                        console.log("Something went wrong with the API")
                    }else{
                        res.status(404).send("An error ocurred with the API")
                    }
                }
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
    const {title,summary,spoonacularScore,healthScore,instructions,diets,image,dishTypes,cuisines} = req.body
    
    let [recipe] = await Recipe.findOrCreate({where:{title,summary,spoonacularScore,healthScore,instructions,image,dishTypes,cuisines}})
    recipe.setDiets(diets)
    return res.status(200).json(recipe)
    
    
});

module.exports = router;