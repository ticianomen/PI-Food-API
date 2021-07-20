import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecipeDetail } from '../../actions/index';
import './RecipeDetails.css';
import Spoon from '../../images/Spoon.png'
import Healthy from '../../images/Healthy.png'
import defaultImage from '../../images/defaultImage.jpg'

function Details(props) {

useEffect(()=>{
    props.getRecipeDetail(props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
        return (
            <div className="recipe-detail">
                <div className='contenedor'>
                    
                    <div className='contenedor-data'>
                        <h1>{props.recipeDetail.title}</h1> 
                        <div className='first-data'>
                            <img src= {props.recipeDetail.image?props.recipeDetail.image:defaultImage} alt='Recipe img'/>
                            <div className='second-data'>
                                <label className='scores'>
                                    <label>Our Score:  {props.recipeDetail.spoonacularScore} <img src= {Spoon} alt='Spoon Score'/></label>
                                    <label>Health Score:  {props.recipeDetail.healthScore} <img src= {Healthy} alt='Health Score'/></label>
                                </label>
                                <div className="lists">
                                <div className="list">
                                    <h2>Diets: </h2>
                                    <ul>
                                    {
                                        props.recipeDetail.diets?props.recipeDetail.diets.map((diet,index)=><li key={index}>{diet}</li>):<li>{props.recipeDetail.diet}</li>
                                    }
                                    </ul>
                                </div>
                                <div className="list">
                                    <h2>Type of Dish: </h2> 
                                    <ul>
                                    {
                                        props.recipeDetail.dishTypes?props.recipeDetail.dishTypes.map((dish,index)=><li key={index}>{dish}</li>):<li>{props.recipeDetail.dishTypes}</li>
                                    }
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                        <label>Recipe summary: </label><p>{props.recipeDetail.summary}</p>
                        <label>Step by step: </label><p>{props.recipeDetail.instructions}</p>
                    </div>
                </div>
            </div>
        );
    
}

function mapStateToProps(state){
    return{
        recipeDetail: state.recipeDetail
    };
}

function mapDispatchToProps(dispatch){
    return{
        getRecipeDetail: id => dispatch(getRecipeDetail(id))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Details);