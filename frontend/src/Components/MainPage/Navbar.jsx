import React from 'react'
import {Link} from 'react-router-dom';

import './Navbar.css';
import Union_Logo from '../../Images/Union.png'

const Navbar = () => {
  return (
    <>
    <nav>
    <div className="logo">
      <img src={Union_Logo} alt="" />
      <Link className="nav-link" to='#'>Travel.</Link>
    </div>
    <div className="links">
      <Link className="nav-link" to='/find_a_trip'>find a trip</Link>
      <Link className="nav-link" to='/destination'>destination</Link>
      <Link className="nav-link" to='/why_besnik'>why besnik</Link>
      <Link className="nav-link" to='/contact'>contact</Link>
    </div>
    <div className="AccountLink">
      <Link className="nav-link" to='/createAccount'>Create Account</Link>
    </div>
    </nav>
    </>
  )
}

export default Navbar