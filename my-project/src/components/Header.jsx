import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <nav style={{ padding: '1rem', backgroundColor: '#333', marginBottom: '1rem' }}>
                <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
                <Link to="/About" style={{ color: 'white', marginRight: '1rem' }}>About</Link>
                <Link to="/Contact" style={{ color: 'white', marginRight: '1rem' }}>Contact</Link>
                <Link to="/Login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
                <Link to="/Signup" style={{ color: 'white', marginRight: '1rem' }}>Signup</Link>
                <Link to="/Dashboard" style={{ color: 'white', marginRight: '1rem' }}>Dashboard</Link>
            </nav>
        </div>
    )
}


export default Header


// login sign up needts to be added , logo needs to be added