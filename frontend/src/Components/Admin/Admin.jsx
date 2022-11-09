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

    return (
        <>
            <div className="container">
                <h1>Dashboard</h1>
                <div className="card_Container">
                    <Link className="card userCard" to='/admin/userDetials'>
                        <User  />
                    </Link>
                    {/* <Link className="card userCard" to='/admin/orders'>
                        <Order  />
                    </Link>
                    <Link className="card userCard" to='/admin/income'>
                        <Income  />
                    </Link> */}
                </div>
                <Outlet />
            </div>

            

        </>
    )
}

export default React.memo(Admin);