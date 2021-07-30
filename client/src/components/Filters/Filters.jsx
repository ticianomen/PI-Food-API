import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {filterDiets} from '../../actions/index'
import Order from '../OrderAlpha/Order'
import OrderScore from '../OrderScore/OrderScore'
import "./Filters.css"

function Filters({filterDiets,diets}) {

    const [state,setState]=useState({
        diets: [],
    })
    useEffect(() => {
        filterDiets(state.diets)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.diets])

    const handleChangeT = (e) =>{
        if(e.target.checked){
            setState({
            ...state,
            diets: [...state.diets,e.target.value],
            })
        }else{
            setState({
                ...state,
                diets: state.diets.filter(diet=> diet!==e.target.value),
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
            <OrderScore/>
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