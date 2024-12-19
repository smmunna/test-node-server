"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Creating Schema
const orderSchema = new mongoose_1.Schema({
    total_amount: { type: Number, required: true },
    currency: { type: String, required: true },
    tran_id: { type: String, unique: true, required: true },
    success_url: { type: String, required: true },
    fail_url: { type: String, required: true },
    cancel_url: { type: String, required: true },
    ipn_url: { type: String, required: true },
    shipping_method: { type: String },
    product_name: { type: String },
    product_category: { type: String },
    product_profile: { type: String },
    cus_name: { type: String },
    cus_email: { type: String },
    cus_add1: { type: String },
    cus_add2: { type: String },
    cus_city: { type: String },
    cus_state: { type: String },
    cus_postcode: { type: String },
    cus_country: { type: String },
    cus_phone: { type: String },
    cus_fax: { type: String },
    ship_name: { type: String },
    ship_add1: { type: String },
    ship_add2: { type: String },
    ship_city: { type: String },
    ship_state: { type: String },
    ship_postcode: { type: Number },
    ship_country: { type: String },
    status: { type: String },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps
// Creating a Model
const orderModel = (0, mongoose_1.model)('order', orderSchema);
exports.default = orderModel;
