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
// orderPay for receiveing payments data from user and send payment gateway url
const orderPay = (req, res, next) => {
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
    (0, sslCommerze_config_1.default)(data)
        .then((GatewayPageURL) => {
        res.send({ chekoutPageURL: GatewayPageURL });
        console.log('Redirecting to: ', GatewayPageURL);
    })
        .catch((error) => {
        next(error);
    });
};
// Redirecting url to frontend
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(`${process.env.FRONTEND_SUCCESS_URL}`);
});
const fail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(`${process.env.FRONTEND_FAIL_URL}`);
});
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(`${process.env.FRONTEND_CANCEL_URL}`);
});
exports.orderController = {
    orderPay,
    success,
    fail,
    cancel,
};
