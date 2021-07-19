import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import './Search.css';
import { getRecipes,getDiets } from "../../actions";

function Search(props){
  const [state,setState] = useState({
    recipes:"",
  })
  useEffect(()=>{
      getRecipes();
      getDiets();
  },[])
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]:[e.target.value]
    })
  }

  function handleSubmit(e){
    console.log(props)
    e.preventDefault()
    props.getRecipes(state.recipes)
    props.getDiets()
    
  }

  return(
    <form className="search" onSubmit={(e)=> handleSubmit(e)}>
      <div className="searchBar">
      <input type="text" placeholder="Search recipes..." className='placehold'   name="recipes" value={state.recipes} onChange={(e)=> handleChange(e)}/>
      <button type="submit" onClick={(e)=> handleSubmit(e)}>
        SEARCH
      </button>
      </div>
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
      getRecipes: name => dispatch(getRecipes(name)),
      getDiets: ()=> dispatch(getDiets())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);