import mongoose, { mongo } from "mongoose";

const db_Conn = ()=> mongoose.connect('mongodb+srv://testProject:testProject@cluster0.vmi5vxx.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('Connection is Successfull');
}).catch((error)=>{
    console.log(error);
})

export default db_Conn;