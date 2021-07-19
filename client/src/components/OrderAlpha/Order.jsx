import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {orderAlphabetically} from '../../actions/index'
import "./Order.css"

function Order(props) {

    const [state,setState]=useState("ASC")

    const onChangeSelect = function(){
        if(state==='ASC'){
            setState("DESC")
        }
        if(state==="DESC"){
            setState("ASC")
        }
    } 

    useEffect(() => {
        if(state==='ASC'){
            props.orderAlphabetically(state)
        }
        if(state==="DESC"){
            props.orderAlphabetically(state)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div className="select_box">
            <button className="order" type="switch" name ="order" onClick={()=>onChangeSelect()} >{state}</button>
        </div>
    )
}

function mapStatesToProps(state){
    return {
        recipes: state.recipes,
    }
}

export default connect(mapStatesToProps, { orderAlphabetically } )(Order);