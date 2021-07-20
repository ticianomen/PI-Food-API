import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {filterDiets} from '../../actions/index'
import Order from '../OrderAlpha/Order'
import "./Filters.css"

function Filters({filterDiets,diets}) {

    const [state,setState]=useState({
        diets: '',
        bool: false
    })
  
    useEffect(() => {
        if(state.bool){
            filterDiets(state.diets)
        }
        if(!state.bool){
            filterDiets('lucho')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.bool,state.diets])

    const handleChangeT = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
            bool : e.target.checked
        })
        
    }

    return (
        <div className='filters'>
            <ul className='field-checks'>
                {
                    diets.map((diet,index)=><label key={index} className='containers'><span>{diet.name}</span><input type="checkbox" name='diets' onChange = {(e)=>handleChangeT(e)} value={diet.name}/><span className="checkmarks"></span></label>)
                }
                <Order/>
            </ul>
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