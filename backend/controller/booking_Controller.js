import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51LrHbYSFMNoj0bcHweITqgYUvTeBy6xuiPbNwQJDI9MwEgLR0rf4sAB3udFqBn3b8ALit30nouFAzKtg1WRQ1C9d0085RdLsMJ");

import Booking from '../models/Booking.js'
import Travel from '../models/Travel.js'

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

export const stripe_checkOut = async (req, res) => {
    try {
        const data = req.body;
        const validPlace = await Travel.findOne({ id: data.placeDetails.id }).lean();
        const validpriceDetails = await Travel.findById({ _id: data.placeDetails._id }).select({ Person: { $elemMatch: { _id: data.priceDetails._id } } });
        const jsonPrice = validpriceDetails.Person[0];

        const customer = await stripe.customers.create({
            metadata: {
                id: validPlace._id,
                destination: validPlace.Destination,
                location: validPlace.Location,
                person: jsonPrice.count,
                price: jsonPrice.price
            },
        })

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
            customer: customer.id,
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:8000/cancel'
        })
        res.send({ url: session.url });
    } catch (error) {
        console.log(error);
    }
};

const createCustomer = async (customer, data) => {
    try {
        let date = new Date();
        console.log(date.toUTCString());
        let booking = customer.metadata;
        let saveData = await Booking({
            customerID: data.customer,
            paymentIntent_Id: data.payment_intent,
            payment_status: data.payment_status,
            booking: booking,
            subTotal: data.amount_subtotal / 100,
            Total: data.amount_total / 100,
        });
        let savedData = await saveData.save();
        console.log(savedData);
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