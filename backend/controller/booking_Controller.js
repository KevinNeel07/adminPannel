import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51LrHbYSFMNoj0bcHZINToNwBWDC1ErECxTut0dil0uw2E2XKlJATYDB8zUmavkoA4djt1qkqPpe0l7RNPPGH5cyF00w1ZzLkqC");

import Booking from '../models/Booking.js'
import Travel from '../models/Travel.js'
import User from '../models/User.js'

export const get_Customer = async (req, res) => {
    try {
        const customer = await stripe.customers.retrieve(
            'cus_MlhXMXUOF6DjDG'
        );
        console.log(customer);
        res.send(customer);

    } catch (error) {
        console.log(error);
    }
}

let userID;

export const stripe_checkOut = async (req, res) => {
    try {
        const data = req.body;
        let user = data.user.result;
        userID = user._id;
        const validPlace = await Travel.findOne({ id: data.placeDetails.id }).lean();
        const validpriceDetails = await Travel.findById({ _id: data.placeDetails._id }).select({ Person: { $elemMatch: { _id: data.priceDetails._id } } });
        const jsonPrice = validpriceDetails.Person[0];

        console.log(user._id);

        const cusId = await User.findOne({ _id: user._id }).lean();
        console.log(cusId, '3');

        if (!cusId.customerID) {                                    //Checks wether the customerId exist in user database else creates the customer in stripe
            const customer = await stripe.customers.create({
                metadata: {
                    id: validPlace._id,
                    destination: validPlace.Destination,
                    location: validPlace.Location,
                    person: jsonPrice.count,
                    price: jsonPrice.price
                },
            })
            console.log('No customer id');
            checkOut_Session(customer.id)
        } else {                                                    
            console.log('Has customer id');
            checkOut_Session(cusId.customerID)
        }

        async function checkOut_Session(customerId) {

            console.log(customerId, 'checkout session id');

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${validPlace.Destination} - ${validPlace.Location}`,
                            description: `Booked ${jsonPrice.count} Person`
                        },
                        unit_amount: `${jsonPrice.price}` * 100,
                    }, quantity: 1
                }],
                customer: customerId,
                mode: 'payment',
                success_url: 'http://localhost:3000/',
                cancel_url: 'http://localhost:8000/cancel'
            })
            res.send({ url: session.url });
        }

    } catch (error) {
        console.log(error);
    }
};

const createCustomer = async (customer, data) => {
    try {
        // let date = new Date();
        // console.log(date.toUTCString());
        let booking = customer.metadata;
        console.log(customer);
        console.log(data);
        let customer_Exist = await Booking.findOne({ customerID: data.customer }).lean();   //checks if customer exist in Booking database else creates the customer 
        console.log(customer_Exist, 'customer_Exist');

        if (!customer_Exist) {
            let newCustomer = await Booking({
                customerID: data.customer,
                product: [{
                    paymentIntent_Id: data.payment_intent,
                    payment_Status: data.payment_status,
                    booking: booking,
                    subTotal: data.amount_subtotal / 100,
                    Total: data.amount_total / 100,
                }]
            });
            let save_Customer = await newCustomer.save();

            console.log(save_Customer);

            let saveData = await User.findByIdAndUpdate({ _id: userID }, { customerID: data.customer });
            console.log(saveData);

        } else {
            let booking_Data = await Booking.findByIdAndUpdate({ customerID: data.customer }, {
                $push: {
                    product: [{
                        paymentIntent_Id: data.payment_intent,
                        payment_Status: data.payment_status,
                        booking: booking,
                        subTotal: data.amount_subtotal / 100,
                        Total: data.amount_total / 100,
                    }
                    ]
                }
            })
        }
    } catch (error) {

    }
}

let endpointSecret = "whsec_f7daa47b1abf54c20899b60f2766986909be34eb0253a3635282527045f39b32";


export const webHook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        data = event.data.object;
        eventType = event.type;
        console.log('working');
        if (eventType === "checkout.session.completed") {
            stripe.customers
                .retrieve(data.customer).then((customer) => {
                    createCustomer(customer, data)
                }).catch((err) => console.log(err.message))
        }

    } catch (error) {
        console.log(error);
    }

};