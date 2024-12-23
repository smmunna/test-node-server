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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const indexProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: 'Hello From Products Controller..' });
});
const createProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log('Creating Products:', data);
    res.status(201).send({ message: 'Products created successfully', data });
});
const editProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Editing Products with ID:', id);
    res.send({ message: `Edit Products called for ID: ${id}` });
});
const updateProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    console.log('Updating Products with ID:', id, 'Data:', updatedData);
    res.send({ message: `Products updated successfully`, data: updatedData });
});
const deleteProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Deleting Products with ID:', id);
    res.send({ message: `Products deleted successfully` });
});
exports.ProductsController = {
    indexProducts,
    createProducts,
    editProducts,
    updateProducts,
    deleteProducts,
};
