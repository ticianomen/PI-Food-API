import React ,{ useState,useEffect} from 'react'
import { connect } from "react-redux";
import './CreateRecipe.css'
import { postRecipe,getDiets, getRecipes } from "../../actions";
import Swal from 'sweetalert2'

function CreateRecipe(props) {
    const [state,setState]= useState({
        title:'',
        summary:'',
        spoonacularScore:0,
        healthScore:0,
        cuisines:[],
        dishTypes:[],
        instructions:'',
        diets:[],
        image:''
    })


    useEffect(()=>{
        props.getDiets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])//como sacar warning

    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleChangeD = (e)=>{
        setState({
            ...state,
            [e.target.name]:[...state[e.target.name], e.target.value]
        })
    }
    function handleImage(e){
        var filesSelected = e.target.files;
        if (filesSelected.length > 0){
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent){
                setState({
                    ...state,
                    image:fileLoadedEvent.target.result
                })
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    const cuisines = ["African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish",
    "Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese",]
    const renderCuisines = cuisines.map((cuisine,index) => {
            return (
            <option key={index} value={cuisine} name="cuisines">
            {cuisine}
            </option>
            )
    });

    const dishTypes = ["main course","side dish","dessert","appetizer","salad","bread","breakfast","soup","beverage","sauce","marinade","fingerfood","snack","drink"]
    const renderDishTypes = dishTypes.map((dish,index) => {
            return (
            <option key={index} value={dish} name="dishTypes">
            {dish}
            </option>
            )
    });
    // const ingredients = []
    // const renderIngrdients = dishTypes.map((ingredient,index) => {
    //         return (
    //         <option key={index} value={ingredient}>
    //         {ingredient}
    //         </option>
    //         )
    // });

    const handleSubmit = async (e)=>{
        console.log(state)
        e.preventDefault();
        await props.postRecipe(state)
            await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your recipe has been created',
            showConfirmButton: false,
            timer: 1500
            })
        await props.getRecipes()
        window.location = "http://localhost:3000/recipes";
    }

    return (
        <div className='body'>
            <div className='formi'>
            <form className='form' onSubmit = {(e)=>handleSubmit(e)} >
            <h1 className='title'>Create your own recipe</h1>
                <label>
                    <p>Recipe Title:</p>
                    <input type='text' className="field-title" onChange = {(e)=>handleChange(e)} name='title' required></input>
                </label>
                <label>
                    <p>Summary:</p>
                    <textarea name='summary' className="field" onChange = {(e)=>handleChange(e)} required></textarea>
                </label>
                <div className="middle-scores">
                <label>
                    <p>Rate your plate:</p>
                    <input name='spoonacularScore' className="scores" onChange = {(e)=>handleChange(e)} type="number" min='1' max='100'></input>
                </label>
                <label>
                    <p>Rate how healthy is your plate:</p>
                    <input name='healthScore' className="scores" onChange = {(e)=>handleChange(e)} type='number' min='1' max='100'></input>
                </label>

                <label className="select">
                    <p>Choose cuisines:</p>
                    <select name="cuisines" multiple="multiple" onChange = {(e)=>handleChangeD(e)}>{renderCuisines}</select>
                </label>
                <label className="select">
                    <p>Choose dish type:</p>
                    <select name="dishTypes" multiple="multiple" onChange = {(e)=>handleChangeD(e)}>{renderDishTypes}</select>
                </label>
                {/* <label className="select">
                    <p>Select ingredients:</p>
                    <select name="ingredients" multiple="multiple" onChange = {(e)=>handleChangeD(e)}>{renderDishTypes}</select>
                </label> */}


                </div>
                
                <label>
                    <p>Instructions:</p>
                    <textarea name='instructions' className="field" onChange = {(e)=>handleChange(e)}></textarea>
                </label>
                    <p>Diets:</p>
                <div  className="field-check">
                {
                    props.diets.map((diet,index)=><label key={index} className='container'><input type="checkbox" name="diets" onChange = {(e)=>handleChangeD(e)} value={diet.id}/><span className="checkmark"></span>{diet.name}</label>)
                }
                </div>
                <label className='image'>
                    <p>Image:</p>
                    <input type="file" name="image" id='inputFileToLoad' className="field" onChange={(e)=>handleImage(e)}/>
                </label>
                <br/>
                <button type="submit" className="field">CREATE</button>

            </form>
            </div>
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
        postRecipe: recipe => dispatch(postRecipe(recipe)),
        getRecipes: () => dispatch(getRecipes()),
        getDiets: () => dispatch(getDiets()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateRecipe);