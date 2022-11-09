import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:8000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const getDestination = ()=> API.get('/');

export const sendPaymentDetails = (placeDetails, priceDetails)=> API.post(`/booking/create-checkout-session`,{placeDetails, priceDetails}).then((res)=>{
    if(res.data.url){
        window.location.href = res.data.url
    }
}).catch((error)=>{
    console.log(error.message);
});

export const userSignUp = (userData) => API.post(`/user/signUp`, userData)

export const userSignIn = (loginData)=> API.post(`/user/signIn`, loginData)
export const getUser = ()=> API.get(`/admin/userStats`)
export const getAllUser = ()=> API.get(`/admin/usersDetails`)