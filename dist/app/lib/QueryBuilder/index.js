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
class QueryBuilder {
    // A reusable method for executing queries
    static executeQuery(model, query, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.find(query, projection);
                return result;
            }
            catch (error) {
                throw new Error(`Query Execution Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage: return await QueryBuilder.Paginate(userModel, {}, projection,1, 2, {username: -1});
     * */
    static Paginate(model_1, query_1) {
        return __awaiter(this, arguments, void 0, function* (model, query, projection = {}, page = 1, pageSize = 10, sort = {} // Optional sorting parameter
        ) {
            try {
                const skip = (page - 1) * pageSize;
                const limit = pageSize;
                const data = yield model.find(query, projection).sort(sort).skip(skip).limit(limit);
                const totalRecords = yield model.countDocuments(query);
                return {
                    data,
                    pagination: {
                        totalRecords,
                        currentPage: page,
                        totalPages: Math.ceil(totalRecords / pageSize),
                        pageSize,
                    },
                };
            }
            catch (error) {
                throw new Error(`Pagination Failed: ${error.message}`);
            }
        });
    }
    // A reusable method for finding a single document
    static findOne(model, query, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.findOne(query, projection);
                if (!result) {
                    throw new Error('No document found matching the query.');
                }
                return result;
            }
            catch (error) {
                throw new Error(`Find One Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage: await QueryBuilder.create(userModel, { name: 'John Doe', email: 'john@example.com' });
     * */
    static create(model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.create(data);
                return result;
            }
            catch (error) {
                throw new Error(`Create Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage:
     * await QueryBuilder.insertMany(userModel, [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },]);
     * */
    static insertMany(model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.insertMany(data);
                return result;
            }
            catch (error) {
                throw new Error(`Insert Many Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage: await QueryBuilder.updateOne(userModel, { email: 'john@example.com' }, { name: 'John Smith' });
     * */
    static updateOne(model, query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.updateOne(query, update, { new: true });
                return result;
            }
            catch (error) {
                throw new Error(`Update One Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage: await QueryBuilder.deleteOne(userModel, { email: 'john@example.com' });
     * */
    static deleteOne(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.deleteOne(query);
                return result;
            }
            catch (error) {
                throw new Error(`Delete One Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage: await QueryBuilder.deleteMany(userModel, { isActive: false });
     * */
    static deleteMany(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.deleteMany(query);
                return result;
            }
            catch (error) {
                throw new Error(`Delete Many Failed: ${error.message}`);
            }
        });
    }
    /**
   * @description
   * Example usage: const activeUsers = await QueryBuilder.count(userModel, { isActive: true });
   * */
    static count(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield model.countDocuments(query);
                return count;
            }
            catch (error) {
                throw new Error(`Count Failed: ${error.message}`);
            }
        });
    }
    /**
     * @description
     * Example usage: const roles = await QueryBuilder.distinct(userModel, 'role');
     * */
    static distinct(model_1, field_1) {
        return __awaiter(this, arguments, void 0, function* (model, field, query = {}) {
            try {
                const result = yield model.distinct(field, query);
                return result;
            }
            catch (error) {
                throw new Error(`Distinct Query Failed: ${error.message}`);
            }
        });
    }
}
exports.default = QueryBuilder;
