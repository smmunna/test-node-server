"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const orders_route_1 = require("../modules/orders/orders.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/orders',
        route: orders_route_1.orderRoutes
    },
    {
        path: '/users',
        route: user_route_1.userRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
