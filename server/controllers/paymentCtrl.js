const { instance } = require("../config/razorpay")
const crypto = require("crypto")
const paymentModel = require("../models/paymentModel");
const mailSender = require("../config/mailSender");
const { paymentSuccessEmail } = require("../template/paymentSuccessEmail");
// create order 

let amount;
const chechOutCtrl = async (req, res) => {
    amount = Number(req.body.amount * 100);
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messsage: "error in creating order"
        })
    }
}

const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            // Save payment details to the database
            await paymentModel.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // const amountInRs = req.body.amount / 100;
            await mailSender(
                "rishimaheshwari010@gmail.com",
                "Payment Received",
                paymentSuccessEmail(amount, razorpay_order_id)
            );

            // Redirect to frontend success page
            return res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
        } else {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error in verifying payment"
        });
    }
};


const getKey = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_KEY
        })

    } catch (error) {
        console.log(error)
        return res.status({
            success: false,
            messsage: "Error in getting key"
        })
    }
}

const paymentSuccessfullMail = async (req, res) => {
    try {
        const { amount, orderId } = req.body;
        await mailSender(
            "rishimaheshwari010@gmail.com",
            "Payment Received",
            paymentSuccessEmail(

                amount / 100,
                orderId,
            )
        )
    } catch (error) {
        return res.status({
            success: false,
            messsage: "Error in sending mail"
        })
    }
}
module.exports = { chechOutCtrl, paymentVerification, getKey, paymentSuccessfullMail }
