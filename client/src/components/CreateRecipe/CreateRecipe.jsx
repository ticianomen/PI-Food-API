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
        instructions:'',
        diets:[],
        selectedFile:null
    })


    useEffect(()=>{
        props.getDiets()
        props.getRecipes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])//como sacar warning

    const handleChange = (e)=>{
        console.log(state)
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleChangeD = (e)=>{
        setState({
            ...state,
            diets:[...state.diets, e.target.value]
        })
    }

    const fileSelectedHandler = (e)=>{
        var canvas=document.getElementById('canvas')
        console.log(canvas.toDataURL())
        setState({
            selectedFile: e.target.files[0].data
        })
    }

    const handleSubmit = async (e)=>{
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

            <form className='form' onSubmit = {(e)=>handleSubmit(e)} >
            <h1 className='title'>Create your own recipe</h1>
                <label>
                    <p>Titulo receta:</p>
                    <input type='text' className="field-title" onChange = {(e)=>handleChange(e)} name='title' required></input>
                </label>
                <label>
                    <p>Resumen de la receta receta:</p>
                    <textarea name='summary' className="field" onChange = {(e)=>handleChange(e)} required></textarea>
                </label>
                <label>
                    <p>Puntuacion receta:</p>
                    <input name='spoonacularScore' className="field-score" onChange = {(e)=>handleChange(e)} type="number" min='1' max='100'></input>
                </label>
                <label>
                    <p>Puntuacion Saludable:</p>
                    <input name='healthScore' className="field-score" onChange = {(e)=>handleChange(e)} type='number' min='1' max='100'></input>
                </label>
                <label>
                    <p>Paso a paso:</p>
                    <textarea name='instructions' className="field"></textarea>
                </label>
                    <p>Tipo de dietas:</p>
                <div  className="field-check">
                {
                    props.diets.map(diet=><label className='container'>{diet.name}<input type="checkbox" name="diets" onChange = {(e)=>handleChangeD(e)} value={diet.id}/><span class="checkmark"></span></label>)
                }
                </div>
                <label className='image'>
                    <p>Imagen del plato:</p>
                    <input type="file" name="image" id='canvas' className="field" onChange={fileSelectedHandler}/>
                </label>
                <br/>
                <button type="submit" className="field">CREATE</button>
                
                
                
                
                
            </form>
            
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