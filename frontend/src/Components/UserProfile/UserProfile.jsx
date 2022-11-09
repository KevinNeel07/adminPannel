import React from 'react'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));


    function logout(e){
        e.preventDefault();
        dispatch({type: 'LOGOUT'});
        navigate('/')
    }

    return (
        <>
            <h1>{user.result.name}</h1>
            <h1>{user.result.email}</h1>
                <button onClick={logout} type='Submit'>Logout</button>
        </>
    )
}

export default UserProfile