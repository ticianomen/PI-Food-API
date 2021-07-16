import React, { useState } from "react";
import { connect } from "react-redux";
import './Buscador.css';
import { getRecipes } from "../../actions";

function Buscador(props){
  const [state,setState] = useState({
    recipes:"",
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]:[e.target.value]
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    props.getRecipes(state.recipes)
  }

  return(
    <form onSubmit={(e)=> handleSubmit(e)}>
      <button type="submit" >
        BUSCAR
      </button>
      <input type="text" placeholder="Buscar recetas..." name="recipes" value={state.recipes} onChange={(e)=> handleChange(e)}/>
    </form> 
  )
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch){
  return{
      getRecipes: name => dispatch(getRecipes(name))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Buscador);