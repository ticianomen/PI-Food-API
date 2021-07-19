import React, {useEffect} from "react";
import { connect } from "react-redux";
import './Home.css';
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import {getDiets, getRecipes, orderAlphabetically} from '../../actions'

function Home(props) {
    
    useEffect(()=>{
        getRecipes();
        getDiets();
        orderAlphabetically();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

// if(document.referrer &&
// document.referrer.indexOf("http://localhost:3000/recipes") == -1)
// {
//     props.getRecipes();// Page loading process script goes here.
    
//     props.getDiets();
// }
    return (
        
        <div className='Search'>
            <div className='box'>         
                <Search/>
                <Pagination/>
            </div>

        </div>
    ) 
}
function mapStateToProps(state) {
    return {
        recipes: state.recipes
    };
}

function mapDispatchToProps(dispatch){
    return{
        getRecipes: name=>dispatch(getRecipes(name)),
        getDiets: ()=>dispatch(getDiets()),
        orderAlphabetically: ()=>dispatch(orderAlphabetically())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);