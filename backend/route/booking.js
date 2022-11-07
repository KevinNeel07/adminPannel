import express from "express";
const booking  = express.Router();

import {stripe_checkOut, webHook} from '../controller/booking_Controller.js';
booking.use("/booking/webhook", express.raw({ type: "*/*" }));

booking.post('/create-checkout-session', stripe_checkOut)

booking.post('/webhook', express.raw({ type: 'application/json' }), webHook);

export default booking;