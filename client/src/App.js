import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
      <React.Fragment>
      <Route path ='/recipes' component={NavBar} />
      <Route path ='/recipe' component={NavBar} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/recipes" component={Home} />
      <Route exact path="/recipes/:id" component={RecipeDetails} />
      <Route exact path="/recipe" component={CreateRecipe} />
      </React.Fragment>
  );
}


export default App;
