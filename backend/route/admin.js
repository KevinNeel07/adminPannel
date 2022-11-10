import express from 'express';
const admin = express.Router();
import moment from 'moment';

import Booking from '../models/Booking.js';
import User from '../models/User.js';

admin.get('/userStats', async(req,res)=>{
    try {
        const perviousMonth = moment().month(moment().month()-1).set("date", 1).format("YYYY-MM-DD HH:mm:ss");

        const users = await User.aggregate([
            {
                $match:{createdAt: {$gte: new Date(perviousMonth)}}
            },
            {$project:{
                month:{$month: "$createdAt"}
            }},{
                $group:{
                    _id: "$month",
                    total:{$sum: 1}
                }
            }
        ])

        function compare(a, b){
            if(a._id < b._id){
                return 1;
            }if(a._id > b._id){
                return -1
            }return 0
        }

        let sortedUsers = users.sort(compare);
        console.log(users);
        res.send(sortedUsers)
    } catch (error) {
        console.log(error);
    }
})


admin.get('/orderStats', async(req,res)=>{
    try {
        const perviousMonth = moment().month(moment().month()-1).set("date", 1).format("YYYY-MM-DD HH:mm:ss");

        const orders = await Booking.aggregate([
            {
                $match:{createdAt: {$gte: new Date(perviousMonth)}}
            },
            {$project:{
                month:{$month: "$createdAt"}
            }},{
                $group:{
                    _id: "$month",
                    total:{$sum: 1}
                }
            }
        ])

        function compare(a, b){
            if(a._id < b._id){
                return 1;
            }if(a._id > b._id){
                return -1
            }return 0
        }

        let sortedOrders = orders.sort(compare);
        console.log(sortedOrders, 'orders');
        res.send(sortedOrders)
    } catch (error) {
        console.log(error);
    }
})


admin.get('/incomeStats', async(req,res)=>{
    try {
        const perviousMonth = moment().month(moment().month()-1).set("date", 1).format("YYYY-MM-DD HH:mm:ss");

        const orders = await Booking.aggregate([
            {
                $match:{createdAt: {$gte: new Date(perviousMonth)}}
            },
            {$project:{
                month:{$month: "$createdAt"},
                sales: "$Total"
            }},{
                $group:{
                    _id: "$month",
                    total:{$sum: "$sales"}
                }
            }
        ])

        function compare(a, b){
            if(a._id < b._id){
                return 1;
            }if(a._id > b._id){
                return -1
            }return 0
        }

        let sortedOrders = orders.sort(compare);
        console.log(sortedOrders, 'income');
        res.send(sortedOrders)
    } catch (error) {
        console.log(error);
    }
})

admin.get('/usersDetails', async(req,res)=>{
    try {
        const users = await User.find().select('-password');
        console.log(users);
        res.json({users: users})
    } catch (error) {   
        console.log(error);
    }
})

// .populate('user' , '-password')

export default admin;