import mongoose from 'mongoose';

const travelSchema = mongoose.Schema({
    Destination:{
        type: String
    },
    Locatoin:{
        type:String
    },
    Person:[{
        count:{
            type: Number
        },
        price:{
            type: Number
        }
    }]
})

const Travel = mongoose.model('travels', travelSchema)

export default Travel;