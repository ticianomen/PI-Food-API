import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import './Home.css';
import Search from "../Search/Search";
import Filters from '../Filters/Filters';
import Pagination from "../Pagination/Pagination";
import {getDiets, getRecipes,filterDiets,orderAlphabetically} from '../../actions'
import Loading from '../../images/Loading.gif'

function Home({getDiets,getRecipes,filterDiets,orderAlphabetically}) {
    
const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
        async function fetch(){
            await getRecipes();
            await getDiets();
            await filterDiets();
            await orderAlphabetically()
            setLoading(false)
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

if(loading){
    return(
        <div className="contenedor">
            <img className="loading" src = {Loading} alt = 'Loading' />
            Loading... 
        </div>
    )
}
else{
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