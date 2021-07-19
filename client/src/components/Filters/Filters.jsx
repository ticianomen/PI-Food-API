import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {getRecipes,getDiets} from '../../actions/index'
import Order from '../OrderAlpha/Order'
import "./Filters.css"

function Filters(props) {

    const [state,setState]=useState({
        todos: props.recipes,
        diets: []
    })
    
    useEffect(()=>{
        getRecipes();
        getDiets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChangeT = (e)=>{
        setState({
            ...state,
            todos: [...state.recipes.filter(recipe=>recipe.diets.find(element => element===e.target.name))]
        })
    }
    
    return (
        <div className='filters'>
            <ul className='field-checks'>
                {
                    props.diets.map(diet=><label className='containers'><span>{diet.name}</span><input type="checkbox" name='diets' onClick = {(e)=>this.handleChangeT(e)} value={diet.name}/><span class="checkmarks"></span></label>)
                }
                <Order/>
            </ul>
        
        
        </div>
    )
}

function mapStateToProps(state){
    return{
        recipes: state.recipes,
        diets: state.diets
    };
}
function mapDispatchToProps(dispatch){
    return{
        getRecipes: () => dispatch(getRecipes()),
        getDiets: () => dispatch(getDiets()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Filters);