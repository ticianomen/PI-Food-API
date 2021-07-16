const initialState = {
    recipes: [],
    recipeDetail: {}
};

function rootReducer(state = initialState, action) {

    if (action.type === "GET_RECIPES") {
        return {
            ...state,
            recipes: action.payload
        };
    }
    if(action.type === "GET_RECIPE_DETAIL"){
        return{
            ...state,
            recipeDetail: action.payload
        }
    }

    return state;
}

export default rootReducer;