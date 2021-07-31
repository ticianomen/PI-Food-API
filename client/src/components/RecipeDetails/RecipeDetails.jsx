import React,{ useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRecipeDetail } from '../../actions/index';
import './RecipeDetails.css';
import Spoon from '../../images/Spoon.png'
import Healthy from '../../images/Healthy.png'
import defaultImage from '../../images/defaultImage.jpg'
import Loading from '../../images/Loading.gif'

function Details(props) {

    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
        async function getDetails(){
            await props.getRecipeDetail(props.match.params.id)
            setLoading(false)
        }
        getDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(loading){
    return(
        <div className="contenedor">
            <img className="loading" src = {Loading} alt = 'Loading' />
            Loading... 
        </div>
    )
    }else{
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
                                        (props.recipeDetail.diets&&props.recipeDetail.diets.length>0)?props.recipeDetail.diets.map((diet,index)=><li key={index}>{diet}</li>):<li>No diets</li>
                                    }
                                    </ul>
                                </div>
                                <div className="list-ING">
                                    <h2>Ingredients: </h2> 
                                    <div className="list-ingrdients">
                                    {
                                        props.recipeDetail.ingredients?props.recipeDetail.ingredients.map((ingrdient,index)=><label className="ingrdients" key={index}>{ingrdient}</label>):<label>No ingrdients</label>
                                    }
                                    </div>
                                </div>
                                <div className="list">
                                    <h2>Type of Dish: </h2> 
                                    <ul>
                                    {
                                        props.recipeDetail.dishTypes?props.recipeDetail.dishTypes.map((dish,index)=><li key={index}>{dish}</li>):<li>No dishTypes</li>
                                    }
                                    </ul>
                                </div>
                                <div className="list">
                                    <h2>Cuisines: </h2> 
                                    <ul>
                                    {
                                        (props.recipeDetail.cuisines&&props.recipeDetail.cuisines.length>0)?props.recipeDetail.cuisines.map((cuisine,index)=><li key={index}>{cuisine}</li>):<li>No cuisines</li>
                                    }
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                        <label>Recipe summary: </label><p>{props.recipeDetail.summary?props.recipeDetail.summary:"This recipe does not have a summary"}</p>
                        <label>Step by step: </label><p>{props.recipeDetail.instructions?props.recipeDetail.instructions:"This recipe does not have instructions"}</p>
                    </div>
                </div>
            </div>
        );
    }
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