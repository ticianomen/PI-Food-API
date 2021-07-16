import React from 'react'
import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing() {
    return (
        <div className='Home'>
            <h1>Bienvenidos a PI-FOOD</h1>
            <h2>Donde podras buscar recetas o crear las tuyas!</h2>
            <Link to = {'/recipes'}>
                <button>Comencemos!</button>
            </Link>
        </div>
    )
}
