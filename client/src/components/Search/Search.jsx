import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import './Search.css';
import { getRecipes,getDiets} from "../../actions";
import Loading from '../../images/Loading.gif'

function Search(props){
  const [state,setState] = useState({
    recipes:"",
  })
  const [loading,setLoading]=useState(false)
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

  let inputRef = React.createRef()

  async function get(){
    await props.getRecipes(state.recipes)
    await props.getDiets()
    setLoading(false)
  }
  
  function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    get()
    inputRef.current.value = '';
  }
if(loading){
  return(
    <div className="contenedor">
        <img className="loading" src = {Loading} alt = 'Loading' />
        Loading... 
    </div>
)
}else{
    return(
      <form className="search" onSubmit={(e)=> handleSubmit(e)}>
        <div className="searchBar">
        <input type="text" placeholder="Search recipes..." ref= {inputRef} className='placehold' name="recipes" onChange={(e)=> handleChange(e)}/>
        <button type="submit" onClick={(e)=> handleSubmit(e)}>
          SEARCH
        </button>
        </div>
      </form> 
    )
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch){
  return{
      getRecipes: name => dispatch(getRecipes(name)),
      getDiets: ()=> dispatch(getDiets()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);