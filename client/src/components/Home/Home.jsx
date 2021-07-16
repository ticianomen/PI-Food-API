import React from "react";
import { connect } from "react-redux";
import './Home.css';
import Buscador from "../Buscador/Buscador";
import Recipes from "../Recipes/Recipes";
import Recipe from "../Recipe/Recipe";
// import Pagination from "../Pagination/Pagination";

function Home({recipes = []}) {
    return (
        <div>
            <Buscador/>
            {/* <Pagination> */}
            <Recipes>
                {
                    recipes.map(recipe=> <Recipe image={recipe.image} title={recipe.title} diets={recipe.diets}/>)
                }
            </Recipes>
            {/* </Pagination> */}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes
    };
}

export default connect(mapStateToProps,null)(Home);