import React , {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {orderScore} from '../../actions/index'
import "./OrderScore.css"

function OrderScore(props) {

    const [state,setState]=useState("SCORE UP")

    const onChangeSelect = function(){
        if(state==='SCORE UP'){
            setState("SCORE DOWN")
        }
        if(state==="SCORE DOWN"){
            setState("SCORE UP")
        }
    } 

    useEffect(() => {
        if(state==='SCORE UP'){
            props.orderScore(state)
        }
        if(state==="SCORE DOWN"){
            props.orderScore(state)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div className="select_box">
            <button className="order" type="switch" defaultValue="SCORE UP" name ="order" onClick={()=>onChangeSelect()} >{state}</button>
        </div>
    )
}

function mapStatesToProps(state){
    return {
        recipes: state.recipes,
    }
}

export default connect(mapStatesToProps, { orderScore } )(OrderScore);