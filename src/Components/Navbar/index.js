import React,{useContext, useState} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context';
import './.css'

export const Navbar = (props) => {
    const {userData,logoutUser} = useContext(AppContext);

    const logout = ()=>{
        logoutUser();
        window.location.replace('/');
    }


    return (
        <nav className='navbar'>
            <h4><Link to="/" style={{ color:'white', textDecoration: 'none' }}>Global Link</Link></h4>
            <div className='menu-items'>
                <Link style={{color:'white'}} to="/rec"> Recordings</Link> 
            </div>

            <div className="dropdown">
                <div className="dropdown-header">
                    {userData ? userData.name: ""},
                    <Button className='logoutButton' onClick={logout}>Logout</Button>
                </div>
    
            </div>

        </nav>
    )
}
