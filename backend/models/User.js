import mongoose from 'mongoose';

const user_Schema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    customerID: {
        type: String
    },
    product: [{
        product_ID:{
            type:String
        }
    }]
}, { timestamps: true });

const User = mongoose.model('user', user_Schema);

export default User;