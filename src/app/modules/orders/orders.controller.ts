import { NextFunction, Request, Response } from "express";
import sslCommerzConfiguration from "../../utils/paymentGateway/sslCommerze/sslCommerze.config";

// orderPay for receiveing payments data from user and send payment gateway url
const orderPay = (req: Request, res: Response, next: NextFunction) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each API call
        success_url: process.env.PAYMENT_SUCCESS_URL,
        fail_url: process.env.PAYMENT_FAIL_URL,
        cancel_url: process.env.PAYMENT_CANCEL_URL,
        ipn_url: process.env.IPN_URL,
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
    };

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

// Redirecting url to frontend
const success = async (req: Request, res: Response) => {
    res.redirect(`${process.env.FRONTEND_SUCCESS_URL}`)
}

const fail = async (req: Request, res: Response) => {
    res.redirect(`${process.env.FRONTEND_FAIL_URL}`)
}

const cancel = async (req: Request, res: Response) => {
    res.redirect(`${process.env.FRONTEND_CANCEL_URL}`)
}

export const orderController = {
    orderPay,
    success,
    fail,
    cancel,
}

