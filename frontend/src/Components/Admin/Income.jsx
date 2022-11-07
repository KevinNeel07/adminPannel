import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Income = () => {

    console.log('Income Component');

    const [income, setIncome] = useState([]);
    const [incomePerc, setIncomePerc] = useState([]);
    const dispatch = useDispatch()
    // const userData = useSelector((state)=> state.user);

    useEffect(() => {
        async function fetchedData() {
            let incomeData = await axios.get('http://localhost:8000/admin/incomeStats');
            let newData = ((incomeData.data[0].total - incomeData.data[1].total) / incomeData.data[1].total) * 100;
            setIncome(incomeData.data)
            setIncomePerc(newData);
        }
        fetchedData()
    }, [])

    return (
        <>
            <h3 id='userCount'>{income != '' ? income[0].total: ''}<span>This Month Income </span></h3>
            <h4 id='percentage'>{incomePerc}% <span>Then last month</span> </h4>
        </>
    )
}

export default React.memo(Income);