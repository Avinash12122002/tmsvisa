import razorpay from "../config/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {

        const { amount, currency } = req.body;

        const order = await razorpay.orders.create({

            amount,

            currency,

            receipt: `receipt_${Date.now()}`

        });

        res.status(200).json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
export const verifyPayment = async (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {

            // Save payment in MongoDB here

            return res.status(200).json({

                success: true,

                message: "Payment Verified"

            });

        }

        return res.status(400).json({

            success: false,

            message: "Invalid Signature"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};