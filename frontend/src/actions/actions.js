import * as api from '../api/api';

import {Router, useNavigate, } from 'react-router-dom'


export const getDestination = () => async (dispatch) => {
    try {
        const { data } = await api.getDestination();
        dispatch({ type: 'GET_DESTINATION', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const sendPaymentDetails = (user,placeDetails, priceDetails) => async (dispatch) => {
    try {
        console.log(placeDetails);
        console.log(priceDetails);
        const { data } = await api.sendPaymentDetails(user,placeDetails,
            priceDetails);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (userData,navigate) => async(dispatch)=>{
    try {
        console.log(userData);
        const {data} = await api.userSignUp(userData);
        console.log(data);
        dispatch({type: 'AUTH', data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signIn = (userData,navigate) => async(dispatch)=>{
    try {
        const {data} = await api.userSignIn(userData);
        dispatch({type: 'AUTH',  data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const getUser = ()=> async(dispatch)=>{
    try {
        const {data} = await api.getUser();
        console.log(data);
        dispatch({type: 'GET_USER', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = ()=> async(dispatch)=>{
    try {
        const {data} = await api.getAllUser();
        dispatch({type: 'GET_ALL_USER', payload: data});
    } catch (error) {
        console.log(error);
    }
}