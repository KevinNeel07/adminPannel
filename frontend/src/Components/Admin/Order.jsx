import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Order = () => {

    console.log('Order Component');

    const [orders, setOrders] = useState([]);
    const [orderPerc, setOrderPerc] = useState([]);
    const dispatch = useDispatch()
    // const userData = useSelector((state)=> state.user);

    useEffect(() => {
        async function fetchedData() {
            let orderData = await axios.get('http://localhost:8000/admin/orderStats');
            let newData = ((orderData.data[0].total - orderData.data[1].total) / orderData.data[1].total) * 100;
            setOrders(orderData.data)
            setOrderPerc(newData);
        }
        fetchedData()
    }, [])

    return (
        <>
            <h3 id='userCount'>{orders != '' ? orders[0].total: ''}<span>This Month Bookings </span></h3>
            <h4 id='percentage'>{orderPerc}% <span>Then last month</span> </h4>
        </>
    )
}

export default React.memo(Order);