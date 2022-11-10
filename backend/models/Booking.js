import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customerID: {
        type: String
    },
    product: [{
        paymentIntent_Id: {
            type: String
        },
        payment_status: { type: String },
        booking: [{
            id: { type: String },
            destination: { type: String },
            location: { type: String },
            person: {
                type: Number
            },
        }],
        subTotal: { type: Number },
        Total: { type: Number },
    }]

}, { timestamps: true });

const Booking = mongoose.model('booking', bookingSchema);

export default Booking