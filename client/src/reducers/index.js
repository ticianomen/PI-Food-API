const initialState = {
    recipes: [],
    recipesBack:[],
    recipeDetail: {},
    diets:[],
};

function rootReducer(state = initialState, action) {

    if (action.type === "GET_RECIPES") {
        return {
            ...state,
            recipes: action.payload,
            recipesBack: action.payload
        };
    }
    if(action.type === "GET_RECIPE_DETAIL"){
        return{
            ...state,
            recipeDetail: action.payload
        }
    }
    if(action.type === "GET_DIETS"){
        return{
            ...state,
            diets: action.payload
        }
    }
    if(action.type === "POST_RECIPE"){
        return{
            ...state,
            recipes: [...state.recipes,action.payload]
        }
    }

    if(action.type === "ORDER"){
        let arr = [...state.recipesBack]; 
            if (action.payload === 'ASC') {
                return {           
                    ...state,           
                    recipes: arr.sort(function (a, b) {             
                        if (a.title.toUpperCase() > b.title.toUpperCase()) {               
                            return 1;             
                        }             
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {               
                            return -1;             
                        }             
                        return 0;           
                    })         
                }       
            } else {         
                return {           
                    ...state,           
                    recipes: arr.sort(function (a, b) {             
                        if (a.title.toUpperCase() > b.title.toUpperCase()) {               
                            return -1;             
                        }             
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {               
                            return 1;             
                        }             
                        return 0;           
                    })         
                }       
            }
    }

    if(action.type === "ORDER_SCORE"){
        let arr = [...state.recipesBack]; 
            if (action.payload === 'SCORE UP') {
                return {           
                    ...state,           
                    recipes: arr.sort(function (a, b) {             
                        if (a.spoonacularScore > b.spoonacularScore) {               
                            return 1;             
                        }             
                        if (a.spoonacularScore < b.spoonacularScore) {               
                            return -1;             
                        }             
                        return 0;           
                    })         
                }       
            } else {         
                return {           
                    ...state,           
                    recipes: arr.sort(function (a, b) {             
                        if (a.spoonacularScore > b.spoonacularScore) {               
                            return -1;             
                        }             
                        if (a.spoonacularScore < b.spoonacularScore) {               
                            return 1;             
                        }             
                        return 0;           
                    })         
                }       
            }
    }

    if(action.type === "FILTER"){
        let recipesFilter= [...state.recipesBack]
        if(action.payload && action.payload.length<1){
            return{
                ...state,
                recipes: [...state.recipesBack]
            }
        }else{
            return{
                ...state,
                recipes: recipesFilter.filter(recipe=> action.payload.every(diet => recipe.diets.includes(diet)))
            }
        }
            
    }
    return state;
}

export default rootReducer;