import React, {useEffect} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import './Landing.css'
import {getDiets, getRecipes} from '../../actions/index'


function Landing({getRecipes,getDiets}) {

    useEffect(()=>{
        getRecipes();
        getDiets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])//sin [] se ejecuta infinito 
        //con [] se ejecuta cuando se monta
    return (
        <div className='Body'>
            <div className='Content'>
                <h1>Welcome to PI-FOOD</h1>
                <h2>Where you can find recipes of all kinds,<br/> filter by diet, order by title, or even CREATE your owns!</h2>
                <Link to = {'/recipes'}>
                    <button>LETS COOK!</button>
                </Link>
            </div>
        </div>
    )
}
function mapDispatchToProps(dispatch){
    return{
        getRecipes: name=>dispatch(getRecipes(name)),
        getDiets: ()=>dispatch(getDiets()),
    }
}

export default connect(null,mapDispatchToProps)(Landing);