import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../actions/actions';


const User = () => {

    console.log('User Component');
    const [users, setUsers] = useState([]);
    const [userPerc, setUserPerc] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchedData() {
            console.log('working');
            let userData = await axios.get('http://localhost:8000/admin/userStats');
            console.log(userData);

            if(userData.data < 1){
                userData.data[1].total = { _id: 10, total: 0 };
            }

            let newData = ((userData.data[0].total - userData.data[1].total) / userData.data[1].total) * 100;
            setUsers(userData.data)
            setUserPerc(newData);
        }
        fetchedData()
    }, [])

    return (
        <>
            <h3 id='userCount'>{users != '' ? users[0].total: ''}<span>This Month Users </span></h3>
            <h4 id='percentage'>{userPerc}% <span>Then last month</span> </h4>
        </>
    )
}

export default React.memo(User);