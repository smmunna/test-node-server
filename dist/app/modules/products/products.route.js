"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.get('/', products_controller_1.ProductsController.indexProducts);
router.post('/', products_controller_1.ProductsController.createProducts);
router.get('/:id', products_controller_1.ProductsController.editProducts);
router.put('/:id', products_controller_1.ProductsController.updateProducts);
router.delete('/:id', products_controller_1.ProductsController.deleteProducts);
exports.productsRoutes = router;
