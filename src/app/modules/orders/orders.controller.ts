import { NextFunction, Request, Response } from "express";
import sslCommerzConfiguration from "../../utils/paymentGateway/sslCommerze/sslCommerze.config";
import { ObjectId } from 'mongodb';
import orderModel from "./orders.model";
import config from "../../config";

// orderPay for receiveing payments data from user and send payment gateway url
const orderPay = async (req: Request, res: Response, next: NextFunction) => {
    const transaction_id = new ObjectId().toString(); //generate auto transaction id
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: transaction_id, // use unique tran_id for each API call
        success_url: `${config.payment_success_url}/${transaction_id}`,
        fail_url: `${config.payment_fail_url}/${transaction_id}`,
        cancel_url: `${config.payment_cancel_url}/${transaction_id}`,
        ipn_url: `${config.payment_ipn_url}/${transaction_id}`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        status: 'pending'
    };

    // console.log(data)

    const order = await orderModel.create(data);

    if (order) {
        // call sslcommerz configration file and passing data object to this
        sslCommerzConfiguration(data)
            .then((GatewayPageURL: any) => {
                res.send({ chekoutPageURL: GatewayPageURL });
                console.log('Redirecting to: ', GatewayPageURL);
            })
            .catch((error: Error) => {
                next(error);
            });
    }
    else {
        console.log('Something went wrong')
    }
}


// Redirecting url to frontend
const success = async (req: Request, res: Response) => {
    const transaction_id = req.params.tranId; // get transaction id from url parameter
    // here you can save transaction id and other data in your database
    try {
        // Update the order status to 'success'
        const updatedOrder = await orderModel.findOneAndUpdate(
            { tran_id: transaction_id },
            { status: 'success' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // console.log('Order updated to success:', updatedOrder);
        // Redirect to Frontend success url
        res.redirect(`${config.frontend_success_url}`);

    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
    // console.log(transaction_id)
    // res.redirect(`${process.env.FRONTEND_SUCCESS_URL}`)
}

// If transaction is failed
const fail = async (req: Request, res: Response) => {
    const transaction_id = req.params.tranId; // get transaction id from url parameter
    // here you can save transaction id and other data in your database
    try {
        // Update the order status to 'success'
        const updatedOrder = await orderModel.findOneAndUpdate(
            { tran_id: transaction_id },
            { status: 'fail' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // console.log('Order updated to fail:', updatedOrder);
        // Redirect to Frontend fail url
        res.redirect(`${config.frontend_fail_url}`);

    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
    // res.redirect(`${process.env.FRONTEND_FAIL_URL}`)
}

// if user cancel the order
const cancel = async (req: Request, res: Response) => {
    const transaction_id = req.params.tranId; // get transaction id from url parameter
    // here you can save transaction id and other data in your database
    try {
        // Update the order status to 'cancel'
        const updatedOrder = await orderModel.findOneAndUpdate(
            { tran_id: transaction_id },
            { status: 'cancel' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // console.log('Order updated to cancel:', updatedOrder);
        // Redirect to Frontend cancel url
        res.redirect(`${config.frontend_cancel_url}`);

    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
    // res.redirect(`${process.env.FRONTEND_CANCEL_URL}`)
}

export const orderController = {
    orderPay,
    success,
    fail,
    cancel,
}

