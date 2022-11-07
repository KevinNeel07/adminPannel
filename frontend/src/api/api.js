import axios from 'axios';

const url = 'http://localhost:8000';

export const getDestination = ()=> axios.get(`${url}/`);

export const sendPaymentDetails = (placeDetails, priceDetails)=> axios.post(`${url}/booking/create-checkout-session`,{placeDetails, priceDetails}).then((res)=>{
    if(res.data.url){
        window.location.href = res.data.url
    }
}).catch((error)=>{
    console.log(error.message);
});

export const userSignUp = (userData) => axios.post(`${url}/user/signUp`, userData)

export const userSignIn = (loginData)=> axios.post(`${url}/user/signIn`, loginData)
export const getUser = ()=> axios.get(`${url}/admin/userStats`)
export const getAllUser = ()=> axios.get(`${url}/admin/usersDetails`)