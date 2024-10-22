import express from "express";
import { orderController } from "./orders.controller";

const router = express.Router()

// Your routes here
router.post('/pay', orderController.orderPay) //payorder

export const orderRoutes = router;