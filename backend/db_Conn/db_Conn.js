import mongoose, { mongo } from "mongoose";

const db_Conn = ()=> mongoose.connect(process.env.MONOGO_CONN).then(()=>{
    console.log('Connection is Successfull');
}).catch((error)=>{
    console.log(error);
})

export default db_Conn;