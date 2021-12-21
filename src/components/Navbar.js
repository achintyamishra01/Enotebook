import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
    }, [location])
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('token')) {
            const response = await fetch("http://localhost:4000/api/auth/getuser", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.token
                },
            })
            const json = await response.json();
            //  =json.name;
            // console.log(userName)   
            console.log(json);
            setUserName(json.name);
            setUserId(json.email);
        }
        // return json.name
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Enotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === "/") ? "active" : ""}  `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}  `} to="/about">About</Link>
                            </li>
                           
                        </ul>
                        {(!localStorage.getItem('token')) ?
                            <form className="d-flex">


                                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-2" to="/signUp" role="button">SignUp</Link>
                            </form> : (
                                <form className='d-flex'>
                                          <div className="btn-group">
                                        <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleClick}>
                                            Accounts
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark p-2">
                                            <li><b>User Name</b>: {userName}</li>
                                            <li><b>User Id</b>: {userId}</li>
                                            
                                            
                                           
                                           
                                        </ul>
                                    </div>

                                    <button onClick={handleLogout} className='btn btn-primary mx-4'>Logout</button>
                                    {/* <!-- Example single danger button --> */}
                                  
                                </form>
                            )

                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
