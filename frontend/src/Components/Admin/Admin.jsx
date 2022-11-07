import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import User from './User'
import Order from './Order'
import Income from './Income'
import './Admin.css'

import { Link, Routes, Route, NavLink, Outlet } from 'react-router-dom';

import {getAllUsers} from '../../actions/actions'; 

import UserDetailsStats from '../DetailsStats/UserDetailsStats';

import QuickLinks from './quick_links/QuickLinks';
import Summary from './Summary';

const Admin = () => {

    console.log('Admin component');

    const [userVisible, setUserVisible] = useState(false);
    const [orderVisible, setOrderVisible] = useState(false);
    const [bookingVisible, setBookingVisible] = useState(false);

    return (
        <>
            <div className="container">
                <h1>Dashboard</h1>
                <div className="card_Container">
                    <Link className="card userCard" to='/admin/userDetials'>
                        <User  />
                    </Link>
                    <Link className="card orderCard" onClick={e => { setOrderVisible(prevState => (prevState, true)); setBookingVisible((prevState => (prevState, false)));setUserVisible((prevState => (prevState, false))); }}>
                        <Order />
                    </Link>
                    <Link className="card incomeCard" onClick={e => { setBookingVisible(prevState => (prevState, true));setUserVisible((prevState => (prevState, false))); setOrderVisible((prevState => (prevState, false)));  }}>
                        <Income />
                    </Link>
                </div>

                <div className="details_container">
                   {userVisible== true ? <UserDetailsStats /> : ''}
                </div>
                <Outlet />
            </div>

            

        </>
    )
}

export default Admin;