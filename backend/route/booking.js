import express from "express";
const booking  = express.Router();

import {stripe_checkOut,get_Customer, webHook} from '../controller/booking_Controller.js';
import auth from '../middleware/auth.js'

booking.use("/booking/webhook", express.raw({ type: "*/*" }));

booking.get('/getCustomer', get_Customer);

booking.post('/create-checkout-session', auth,stripe_checkOut)

booking.post('/webhook', express.raw({ type: 'application/json' }), webHook);

export default booking;