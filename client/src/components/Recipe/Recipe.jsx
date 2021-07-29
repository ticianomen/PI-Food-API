import React from 'react'
import { Link } from 'react-router-dom'
import './Recipe.css'
import defaultImage from '../../images/defaultImage.jpg'

export default function Recipe({id,title,image,diets=[]}) {

    if(title==='No recipes matched that name'){
        return(
            <div className='meal-notFound'>
                <h2 className="notFound">{title}</h2>
            </div>
        )
    }else{
        return (
        
            <div className='meal'>
                <Link to ={`/recipes/${id}`}>
                    <img src={image?image:defaultImage} className='meal-photo' alt={title + ' image'}/>
                </Link>
                <p className="centered">{title}</p>
                <ul className="bottom-left">
                    {
                        diets.map((diet,index)=> <li key={index}><span>{diet}</span></li>)
                    }
                </ul>
            </div>
        
    )
    }
    
}
