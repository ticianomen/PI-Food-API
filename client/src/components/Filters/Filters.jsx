import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {filterDiets} from '../../actions/index'
import Order from '../OrderAlpha/Order'
import "./Filters.css"

function Filters({filterDiets,diets}) {

    const [state,setState]=useState({
        diets: []
    })
    console.log(state.diets)
    useEffect(() => {
        filterDiets(state.diets)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.diets])

    const handleChangeT = (e) =>{
        if(e.target.checked===true){
            setState({
                ...state,
                diets: [...diets,e.target.value]
            })
        }
        if(e.target.checked===false){
            setState({
            ...state,
            diets: diets.filter(diet=> diet!==e.target.value)
        })
        }
        
        
    }

    return (
        <div className='filters'>
            <ul className='field-checks'>
                {
                    diets.map((diet,index)=><label key={index} className='containers'><input type="checkbox" name='diets' onChange = {(e)=>handleChangeT(e)} value={diet.name}/><span className="checkmarks"></span><span>{diet.name}</span></label>)
                }
            </ul>
            <Order/>
        </div>
    )
}

function mapStateToProps(state){
    return{
        diets: state.diets
    };
}
function mapDispatchToProps(dispatch){
    return{
        filterDiets: (name) => dispatch(filterDiets(name))
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Filters);