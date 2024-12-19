"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../app/modules/orders/orders.controller");
const paymentRoutes = (0, express_1.Router)();
// main url for sucess, fail and cancel it will be on app.ts file.
paymentRoutes.use('/success/:tranId', orders_controller_1.orderController.success);
paymentRoutes.use('/fail/:tranId', orders_controller_1.orderController.fail);
paymentRoutes.use('/cancel/:tranId', orders_controller_1.orderController.cancel);
exports.default = paymentRoutes;
