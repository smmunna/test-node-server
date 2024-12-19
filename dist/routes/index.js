"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../app/modules/user/user.route");
const orders_route_1 = require("../app/modules/orders/orders.route");
const router = (0, express_1.Router)();
router.use('/api/v1/users', user_route_1.userRoutes);
router.use('/api/v1/orders', orders_route_1.orderRoutes);
exports.default = router;
