"use strict";
// Creating products schema
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
// Example: name: { type: String, required: true }
});
const ProductsModel = (0, mongoose_1.model)('Products', productsSchema);
exports.default = ProductsModel;
