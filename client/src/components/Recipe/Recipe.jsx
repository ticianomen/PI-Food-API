import React from 'react'
import './Recipe.css'

export default function Recipe({image,title,diets=[]}) {
    return (
        <div>
            <image src={image} alt={title + ' image'}/>
            <div>
                <p>{title}</p>
                <div>
                    {
                        diets.map(diet=> <p>{diet.name}</p>)
                    }
                </div>
                    
            </div>
        </div>
    )
}
