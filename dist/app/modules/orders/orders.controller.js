"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const sslCommerze_config_1 = __importDefault(require("../../utils/paymentGateway/sslCommerze/sslCommerze.config"));
const mongodb_1 = require("mongodb");
const orders_model_1 = __importDefault(require("./orders.model"));
const config_1 = __importDefault(require("../../config"));
// orderPay for receiveing payments data from user and send payment gateway url
const orderPay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction_id = new mongodb_1.ObjectId().toString(); //generate auto transaction id
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: transaction_id, // use unique tran_id for each API call
        success_url: `${config_1.default.payment_success_url}/${transaction_id}`,
        fail_url: `${config_1.default.payment_fail_url}/${transaction_id}`,
        cancel_url: `${config_1.default.payment_cancel_url}/${transaction_id}`,
        ipn_url: `${config_1.default.payment_ipn_url}/${transaction_id}`,
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
    const order = yield orders_model_1.default.create(data);
    if (order) {
        // call sslcommerz configration file and passing data object to this
        (0, sslCommerze_config_1.default)(data)
            .then((GatewayPageURL) => {
            res.send({ chekoutPageURL: GatewayPageURL });
            console.log('Redirecting to: ', GatewayPageURL);
        })
            .catch((error) => {
            next(error);
        });
    }
    else {
        console.log('Something went wrong');
    }
});
// Redirecting url to frontend
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction_id = req.params.tranId; // get transaction id from url parameter
    // here you can save transaction id and other data in your database
    try {
        // Update the order status to 'success'
        const updatedOrder = yield orders_model_1.default.findOneAndUpdate({ tran_id: transaction_id }, { status: 'success' }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // console.log('Order updated to success:', updatedOrder);
        // Redirect to Frontend success url
        res.redirect(`${config_1.default.frontend_success_url}`);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
    // console.log(transaction_id)
    // res.redirect(`${process.env.FRONTEND_SUCCESS_URL}`)
});
// If transaction is failed
const fail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction_id = req.params.tranId; // get transaction id from url parameter
    // here you can save transaction id and other data in your database
    try {
        // Update the order status to 'success'
        const updatedOrder = yield orders_model_1.default.findOneAndUpdate({ tran_id: transaction_id }, { status: 'fail' }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // console.log('Order updated to fail:', updatedOrder);
        // Redirect to Frontend fail url
        res.redirect(`${config_1.default.frontend_fail_url}`);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
    // res.redirect(`${process.env.FRONTEND_FAIL_URL}`)
});
// if user cancel the order
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction_id = req.params.tranId; // get transaction id from url parameter
    // here you can save transaction id and other data in your database
    try {
        // Update the order status to 'cancel'
        const updatedOrder = yield orders_model_1.default.findOneAndUpdate({ tran_id: transaction_id }, { status: 'cancel' }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // console.log('Order updated to cancel:', updatedOrder);
        // Redirect to Frontend cancel url
        res.redirect(`${config_1.default.frontend_cancel_url}`);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
    // res.redirect(`${process.env.FRONTEND_CANCEL_URL}`)
});
exports.orderController = {
    orderPay,
    success,
    fail,
    cancel,
};
