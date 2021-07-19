const initialState = {
    recipes: [],
    recipesBack:[],
    recipeDetail: {},
    diets:[]
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
            recipes: state.recipes?state.recipes.unshift(action.payload):[action.payload]
        }
    }
    if(action.type === "ORDER"){
        let arr = [...state.recipesBack]; 
            if (action.payload === 'ASC') {
                return {           
                    ...state,           
                    recipes: arr.sort(function (a, b) {             
                        if (a.title > b.title) {               
                            return 1;             
                        }             
                        if (a.title < b.title) {               
                            return -1;             
                        }             
                        return 0;           
                    })         
                }       
            } else {         
                return {           
                    ...state,           
                    recipes: arr.sort(function (a, b) {             
                        if (a.title > b.title) {               
                            return -1;             }             
                        if (a.title < b.title) {               
                            return 1;             
                        }             
                        return 0;           
                    })         
                }       
            }
    }

    return state;
}

export default rootReducer;