export function getRecipes(name) {
    return function(dispatch) {
        if(name){
            return fetch("http://localhost:3001/recipes?name="+name)
                .then(response => response.json())
                .then(json => {
                    dispatch({ type: "GET_RECIPES", payload: json });
                });
        }else{
            return fetch("http://localhost:3001/recipes")
                .then(response => response.json())
                .then(json => {
                    dispatch({ type: "GET_RECIPES", payload: json });
                });
        }
        
    };
}

export function getRecipeDetail(id){
    return function(dispatch) {
        return fetch("http://localhost:3001/recipes/" + id)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "GET_RECIPE_DETAIL", payload: json });
        });
    };
}
