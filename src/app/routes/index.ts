import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { orderRoutes } from "../modules/orders/orders.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/orders',
        route: orderRoutes
    },
    {
        path: '/users',
        route: userRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;