import express from 'express';
const app = express();
import cors from 'cors'
import session from 'express-session'

import Travel from './models/Travel.js'

import user from './route/user.js';
import booking from './route/booking.js';
import admin from './route/admin.js'

const PORT = process.env.PORT || 8000;

import db_Conn from './db_Conn/db_Conn.js'
db_Conn();

app.use(cors());
app.use("/booking/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.use('/user', user);
app.use('/booking', booking);
app.use('/admin', admin);

app.get('/', async (req, res, next) => {
    try {
        const travelData = await Travel.find();
        res.status(200).json(travelData);
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is Running at PORT:${PORT}`);
})