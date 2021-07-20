import React, {useEffect} from "react";
import { connect } from "react-redux";
import './Home.css';
import Search from "../Search/Search";
import Filters from '../Filters/Filters';
import Pagination from "../Pagination/Pagination";
import {getDiets, getRecipes,filterDiets,orderAlphabetically} from '../../actions'

function Home({getDiets,getRecipes,filterDiets,orderAlphabetically}) {
    
    useEffect(()=>{
        getRecipes();
        getDiets();
        filterDiets();
        orderAlphabetically()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <div className='Search'>
            <div className='box'>         
                <Search/>
                <Filters/>
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
        getDiets: () => dispatch(getDiets()),
        filterDiets:()=> dispatch(filterDiets()),
        orderAlphabetically: ()=>dispatch(orderAlphabetically())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);