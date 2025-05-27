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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderBy = exports.join = exports.search = exports.avg = exports.count = exports.sum = exports.max = exports.min = exports.deleteOne = exports.updateMany = exports.updateOne = exports.findOne = exports.paginate = exports.findAll = exports.insertMany = exports.insertOne = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// Path to the database file
const dbFilePath = path_1.default.join(__dirname, '../../database/db.json');
// Utility function to read the database
function readDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileContent = yield fs_1.promises.readFile(dbFilePath, 'utf-8');
            return fileContent.trim() ? JSON.parse(fileContent) : { users: [] }; // Return empty structure if file is empty
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                // File doesn't exist, initialize it
                return { users: [] };
            }
            else {
                throw err;
            }
        }
    });
}
// Utility function to write to the database
function writeDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_1.promises.writeFile(dbFilePath, JSON.stringify(data, null, 2));
    });
}
// Insert a single document into a specific collection
function insertOne(collection, document) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContent = yield readDB();
        // Ensure the collection exists
        if (!dbContent[collection]) {
            dbContent[collection] = [];
        }
        // Check if the input is an array
        if (Array.isArray(document)) {
            // Map over the array to add unique IDs
            const newDocuments = document.map((doc) => (Object.assign({ id: Date.now() }, doc)));
            dbContent[collection].push(...newDocuments);
            yield writeDB(dbContent);
            return newDocuments; // Return the array of newly created documents
        }
        // Handle single object
        const newDocument = Object.assign({ id: Date.now() }, document);
        dbContent[collection].push(newDocument);
        yield writeDB(dbContent);
        return newDocument; // Return the newly created document
    });
}
exports.insertOne = insertOne;
// Insert multiple documents into a specific collection
function insertMany(collection, documents) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContent = yield readDB();
        const newDocuments = documents.map((doc) => (Object.assign({ id: Date.now() }, doc)));
        if (!dbContent[collection]) {
            dbContent[collection] = []; // Initialize collection if it doesn't exist
        }
        dbContent[collection].push(...newDocuments);
        yield writeDB(dbContent);
        return newDocuments; // Return the newly created documents
    });
}
exports.insertMany = insertMany;
// Find all documents in a specific collection
function findAll(collection_1) {
    return __awaiter(this, arguments, void 0, function* (collection, query = {}, // Query filter
    projection = {}, // Fields to include/exclude
    options = {} // Sorting options
    ) {
        const dbContent = yield readDB();
        // Ensure the collection exists
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        // Filter documents based on the query
        const results = dbContent[collection].filter((item) => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
        // Apply sorting
        if (options.sortField) {
            const { sortField, sortOrder = "asc" } = options;
            results.sort((a, b) => {
                const fieldA = a[sortField];
                const fieldB = b[sortField];
                if (fieldA < fieldB)
                    return sortOrder === "asc" ? -1 : 1;
                if (fieldA > fieldB)
                    return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        // Apply projection to each result (field exclusion)
        if (Object.keys(projection).length > 0) {
            return results.map((item) => {
                const projectedItem = Object.assign({}, item);
                Object.entries(projection).forEach(([key, value]) => {
                    if (value === 0) {
                        delete projectedItem[key]; // Exclude the field
                    }
                });
                return projectedItem;
            });
        }
        return results; // Return filtered and sorted results without projection
    });
}
exports.findAll = findAll;
// Pagination
function paginate(collection_1) {
    return __awaiter(this, arguments, void 0, function* (collection, query = {}, // Query filter
    projection = {}, // Fields to include/exclude
    options = {} // Pagination, sorting, and filtering options
    ) {
        const dbContent = yield readDB();
        // Ensure the collection exists
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        // Filter documents based on the query
        const filteredResults = dbContent[collection].filter((item) => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
        // Apply projection to each result (field exclusion)
        let projectedResults = filteredResults;
        if (Object.keys(projection).length > 0) {
            projectedResults = filteredResults.map((item) => {
                const projectedItem = Object.assign({}, item);
                Object.entries(projection).forEach(([key, value]) => {
                    if (value === 0) {
                        delete projectedItem[key]; // Exclude the field
                    }
                });
                return projectedItem;
            });
        }
        // Apply sorting
        if (options.sortField) {
            const { sortField, sortOrder = "asc" } = options;
            projectedResults.sort((a, b) => {
                const fieldA = a[sortField];
                const fieldB = b[sortField];
                if (fieldA < fieldB)
                    return sortOrder === "asc" ? -1 : 1;
                if (fieldA > fieldB)
                    return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        // Apply pagination
        const page = options.page && options.page > 0 ? options.page : 1;
        const limit = options.limit && options.limit > 0 ? options.limit : 10;
        const startIndex = (page - 1) * limit;
        const paginatedResults = projectedResults.slice(startIndex, startIndex + limit);
        return {
            total: projectedResults.length,
            page,
            limit,
            totalPages: Math.ceil(projectedResults.length / limit),
            data: paginatedResults
        };
    });
}
exports.paginate = paginate;
// Find One
function findOne(collection_1, query_1) {
    return __awaiter(this, arguments, void 0, function* (collection, query, projection = {} // Fields to include or exclude
    ) {
        const dbContent = yield readDB();
        // Ensure the collection exists
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        // Find the first matching item based on the query
        const result = dbContent[collection].find((item) => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
        if (!result) {
            return null; // Return null if no match is found
        }
        // Apply projection (include or exclude fields)
        if (Object.keys(projection).length > 0) {
            const projectedResult = Object.assign({}, result);
            Object.entries(projection).forEach(([key, value]) => {
                if (value === 0) {
                    delete projectedResult[key]; // Exclude the field
                }
            });
            return projectedResult;
        }
        return result; // Return the result if no projection is specified
    });
}
exports.findOne = findOne;
function updateOne(collection, query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        // Find the document that matches the query
        const docIndex = dbContent[collection].findIndex((item) => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
        if (docIndex === -1) {
            throw new Error('No document found matching the query');
        }
        // Update the document with the new data
        const updatedDocument = Object.assign(Object.assign({}, dbContent[collection][docIndex]), update);
        // Replace the old document with the updated document
        dbContent[collection][docIndex] = updatedDocument;
        // Write the updated data back to db.json
        yield writeDB(dbContent);
        return updatedDocument; // Return the updated document
    });
}
exports.updateOne = updateOne;
function updateMany(collection, query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        // Find documents matching the query
        const updatedDocuments = dbContent[collection].map((item) => {
            const isMatch = Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
            if (isMatch) {
                // Apply the update if the document matches the query
                return Object.assign(Object.assign({}, item), update);
            }
            return item; // If the document doesn't match, return it unchanged
        });
        // Write the updated data back to db.json
        yield writeDB(Object.assign(Object.assign({}, dbContent), { [collection]: updatedDocuments }));
        return updatedDocuments.filter((item) => {
            // Return only the updated documents
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
    });
}
exports.updateMany = updateMany;
// Delete a document by ID
function deleteOne(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContent = yield readDB();
        const collectionData = dbContent[collection] || [];
        const index = collectionData.findIndex((item) => item.id === id);
        if (index === -1) {
            return null; // Document not found
        }
        const [deleted] = collectionData.splice(index, 1); // Remove the document
        yield writeDB(dbContent);
        return deleted; // Return the deleted document
    });
}
exports.deleteOne = deleteOne;
// AGREEGET FUNCTIONS
function applyProjection(item, projection) {
    if (Object.keys(projection).length === 0)
        return item;
    const projectedItem = Object.assign({}, item);
    Object.entries(projection).forEach(([key, value]) => {
        if (value === 0) {
            delete projectedItem[key]; // Exclude fields
        }
    });
    return projectedItem;
}
function min(collection_1, field_1) {
    return __awaiter(this, arguments, void 0, function* (collection, field, query = {}, projection = {}) {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        const results = dbContent[collection].filter((item) => Object.entries(query).every(([key, value]) => String(item[key]) === String(value))).map(item => applyProjection(item, projection));
        if (results.length === 0)
            return null;
        return Math.min(...results.map((item) => Number(item[field]) || 0));
    });
}
exports.min = min;
function max(collection_1, field_1) {
    return __awaiter(this, arguments, void 0, function* (collection, field, query = {}, projection = {}) {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        const results = dbContent[collection].filter((item) => Object.entries(query).every(([key, value]) => String(item[key]) === String(value))).map(item => applyProjection(item, projection));
        if (results.length === 0)
            return null;
        return Math.max(...results.map((item) => Number(item[field]) || 0));
    });
}
exports.max = max;
function sum(collection_1, field_1) {
    return __awaiter(this, arguments, void 0, function* (collection, field, query = {}, projection = {}) {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        const results = dbContent[collection].filter((item) => Object.entries(query).every(([key, value]) => String(item[key]) === String(value))).map(item => applyProjection(item, projection));
        return results.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
    });
}
exports.sum = sum;
function count(collection_1) {
    return __awaiter(this, arguments, void 0, function* (collection, query = {}, projection = {}) {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        const results = dbContent[collection].filter((item) => Object.entries(query).every(([key, value]) => String(item[key]) === String(value))).map(item => applyProjection(item, projection));
        return results.length;
    });
}
exports.count = count;
function avg(collection_1, field_1) {
    return __awaiter(this, arguments, void 0, function* (collection, field, query = {}, projection = {}) {
        const dbContent = yield readDB();
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        const results = dbContent[collection].filter((item) => Object.entries(query).every(([key, value]) => String(item[key]) === String(value))).map(item => applyProjection(item, projection));
        if (results.length === 0)
            return null;
        const totalSum = results.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
        return totalSum / results.length;
    });
}
exports.avg = avg;
function matchQuery(item, query) {
    return Object.entries(query).every(([key, condition]) => {
        if (typeof condition !== "object" || condition === null) {
            return String(item[key]) === String(condition);
        }
        if ("$eq" in condition)
            return item[key] === condition.$eq;
        if ("$ne" in condition)
            return item[key] !== condition.$ne;
        if ("$gt" in condition)
            return item[key] > condition.$gt;
        if ("$gte" in condition)
            return item[key] >= condition.$gte;
        if ("$lt" in condition)
            return item[key] < condition.$lt;
        if ("$lte" in condition)
            return item[key] <= condition.$lte;
        if ("$in" in condition)
            return Array.isArray(condition.$in) && condition.$in.includes(item[key]);
        if ("$nin" in condition)
            return Array.isArray(condition.$nin) && !condition.$nin.includes(item[key]);
        // ✅ Fix for $regex
        if ("$regex" in condition && typeof condition.$regex === "string") {
            return new RegExp(condition.$regex, "i").test(String(item[key]));
        }
        return false;
    });
}
// Search function
function search(collection_1) {
    return __awaiter(this, arguments, void 0, function* (collection, query = {}, projection = {}) {
        const dbContent = yield readDB();
        if (!dbContent[collection])
            throw new Error(`Collection ${collection} not found`);
        const results = dbContent[collection]
            .filter(item => matchQuery(item, query))
            .map(item => applyProjection(item, projection));
        return results;
    });
}
exports.search = search;
// Join with Pagination
function join(fromCollection_1, lookupConfig_1) {
    return __awaiter(this, arguments, void 0, function* (fromCollection, // Main collection (e.g., "persons")
    lookupConfig, query = {}, // Filter condition
    projection = {}, // Fields to exclude (from both collections)
    pagination = {} // Pagination options
    ) {
        const dbContent = yield readDB();
        // Ensure collections exist
        if (!dbContent[fromCollection] || !dbContent[lookupConfig.from]) {
            throw new Error(`One or more collections not found`);
        }
        const mainCollection = dbContent[fromCollection]; // e.g., "persons"
        const lookupCollection = dbContent[lookupConfig.from]; // e.g., "user"
        // Perform Lookup (Join)
        const results = mainCollection.map((mainItem) => {
            let matchingItems = lookupCollection.filter((lookupItem) => String(mainItem[lookupConfig.localField]) === String(lookupItem[lookupConfig.foreignField]));
            // Apply Projection to Joined Collection
            if (Object.keys(projection).length > 0) {
                matchingItems = matchingItems.map((lookupItem) => {
                    const projectedLookupItem = Object.assign({}, lookupItem);
                    Object.entries(projection).forEach(([key, value]) => {
                        if (value === 0)
                            delete projectedLookupItem[key]; // Exclude field
                    });
                    return projectedLookupItem;
                });
            }
            return Object.assign(Object.assign({}, mainItem), { [lookupConfig.as]: matchingItems // Embed matched documents
             });
        });
        // Apply Query Filter
        let filteredResults = results.filter((item) => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
        // Apply Projection to Main Collection
        if (Object.keys(projection).length > 0) {
            filteredResults = filteredResults.map((item) => {
                const projectedItem = Object.assign({}, item);
                Object.entries(projection).forEach(([key, value]) => {
                    if (value === 0)
                        delete projectedItem[key]; // Exclude field
                });
                return projectedItem;
            });
        }
        // **Pagination Handling**
        const page = pagination.page || 1; // Default to page 1
        const limit = pagination.limit || filteredResults.length; // Default: return all
        const totalDocuments = filteredResults.length;
        const startIndex = (page - 1) * limit;
        const paginatedResults = filteredResults.slice(startIndex, startIndex + limit);
        return {
            totalDocuments, // Total records before pagination
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
            data: paginatedResults
        };
    });
}
exports.join = join;
// Order By
// Function to order results from a collection based on custom field and order
function orderBy(collection_1) {
    return __awaiter(this, arguments, void 0, function* (collection, sortField = "name", // Default field to sort by, you can change it to anything.
    sortOrder = "asc" // Default sorting order is ascending
    ) {
        const dbContent = yield readDB();
        // Ensure the collection exists
        if (!dbContent[collection]) {
            throw new Error(`Collection ${collection} not found`);
        }
        // Fetch all items from the collection
        let results = dbContent[collection];
        // Perform sorting based on the specified field and order
        results.sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if (fieldA < fieldB)
                return sortOrder === "asc" ? -1 : 1;
            if (fieldA > fieldB)
                return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        return results; // Return sorted results
    });
}
exports.orderBy = orderBy;
