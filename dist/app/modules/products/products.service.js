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
exports.ProductsService = void 0;
const createToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Add your implementation here...
    return data;
});
const editToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Add your implementation here...
    return id;
});
const updateToDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Add your implementation here...
    return { id, data };
});
const deleteToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Add your implementation here...
    return id;
});
exports.ProductsService = {
    createToDB,
    editToDB,
    updateToDB,
    deleteToDB,
};
