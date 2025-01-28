import { promises as fs } from 'fs';
import path from 'path';

// Path to the database file
const dbFilePath = path.join(__dirname, '../../database/db.json');

// Utility function to read the database
async function readDB() {
    try {
        const fileContent = await fs.readFile(dbFilePath, 'utf-8');
        return fileContent.trim() ? JSON.parse(fileContent) : { users: [] }; // Return empty structure if file is empty
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            // File doesn't exist, initialize it
            return { users: [] };
        } else {
            throw err;
        }
    }
}

// Utility function to write to the database
async function writeDB(data: any) {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
}


// Insert a single document into a specific collection
export async function insertOne(collection: string, document: any) {
    const dbContent = await readDB();

    // Ensure the collection exists
    if (!dbContent[collection]) {
        dbContent[collection] = [];
    }

    // Check if the input is an array
    if (Array.isArray(document)) {
        // Map over the array to add unique IDs
        const newDocuments = document.map((doc) => ({ id: Date.now(), ...doc }));
        dbContent[collection].push(...newDocuments);
        await writeDB(dbContent);
        return newDocuments; // Return the array of newly created documents
    }

    // Handle single object
    const newDocument = { id: Date.now(), ...document };
    dbContent[collection].push(newDocument);
    await writeDB(dbContent);
    return newDocument; // Return the newly created document
}


// Insert multiple documents into a specific collection
export async function insertMany(collection: string, documents: any[]) {
    const dbContent = await readDB();
    const newDocuments = documents.map((doc) => ({ id: Date.now(), ...doc }));

    if (!dbContent[collection]) {
        dbContent[collection] = []; // Initialize collection if it doesn't exist
    }

    dbContent[collection].push(...newDocuments);
    await writeDB(dbContent);

    return newDocuments; // Return the newly created documents
}

// Find all documents in a specific collection
export async function findAll(
    collection: string,
    query: any = {}, // Query filter
    projection: any = {} // Fields to include or exclude
) {
    const dbContent = await readDB();

    // Ensure the collection exists
    if (!dbContent[collection]) {
        throw new Error(`Collection ${collection} not found`);
    }

    // Filter documents based on the query
    const results = dbContent[collection].filter((item: any) => {
        return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
    });

    // Apply projection to each result
    if (Object.keys(projection).length > 0) {
        return results.map((item: any) => {
            const projectedItem = { ...item };
            Object.entries(projection).forEach(([key, value]) => {
                if (value === 0) {
                    delete projectedItem[key]; // Exclude the field
                }
            });
            return projectedItem;
        });
    }

    return results; // Return filtered results without projection
}


// Find a single document by a field
export async function findOne(
    collection: string,
    query: any,
    projection: any = {} // Fields to include or exclude
) {
    const dbContent = await readDB();

    // Ensure the collection exists
    if (!dbContent[collection]) {
        throw new Error(`Collection ${collection} not found`);
    }

    // Find the first matching item based on the query
    const result = dbContent[collection].find((item: any) => {
        return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
    });

    if (!result) {
        return null; // Return null if no match is found
    }

    // Apply projection (include or exclude fields)
    if (Object.keys(projection).length > 0) {
        const projectedResult = { ...result };

        Object.entries(projection).forEach(([key, value]) => {
            if (value === 0) {
                delete projectedResult[key]; // Exclude the field
            }
        });

        return projectedResult;
    }

    return result; // Return the result if no projection is specified
}


import { promises as fs } from 'fs';
import path from 'path';

// Path to the database file
const dbFilePath = path.join(__dirname, '../../database/db.json');

// Utility function to read the database
async function readDB() {
    try {
        const fileContent = await fs.readFile(dbFilePath, 'utf-8');
        return fileContent.trim() ? JSON.parse(fileContent) : { users: [] }; // Return empty structure if file is empty
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            // File doesn't exist, initialize it
            return { users: [] };
        } else {
            throw err;
        }
    }
}

// Utility function to write to the database
async function writeDB(data: any) {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
}


// Insert a single document into a specific collection
export async function insertOne(collection: string, document: any) {
    const dbContent = await readDB();

    // Ensure the collection exists
    if (!dbContent[collection]) {
        dbContent[collection] = [];
    }

    // Check if the input is an array
    if (Array.isArray(document)) {
        // Map over the array to add unique IDs
        const newDocuments = document.map((doc) => ({ id: Date.now(), ...doc }));
        dbContent[collection].push(...newDocuments);
        await writeDB(dbContent);
        return newDocuments; // Return the array of newly created documents
    }

    // Handle single object
    const newDocument = { id: Date.now(), ...document };
    dbContent[collection].push(newDocument);
    await writeDB(dbContent);
    return newDocument; // Return the newly created document
}


// Insert multiple documents into a specific collection
export async function insertMany(collection: string, documents: any[]) {
    const dbContent = await readDB();
    const newDocuments = documents.map((doc) => ({ id: Date.now(), ...doc }));

    if (!dbContent[collection]) {
        dbContent[collection] = []; // Initialize collection if it doesn't exist
    }

    dbContent[collection].push(...newDocuments);
    await writeDB(dbContent);

    return newDocuments; // Return the newly created documents
}

// Find all documents in a specific collection
export async function findAll(
    collection: string,
    query: any = {}, // Query filter
    projection: any = {} // Fields to include or exclude
) {
    const dbContent = await readDB();

    // Ensure the collection exists
    if (!dbContent[collection]) {
        throw new Error(`Collection ${collection} not found`);
    }

    // Filter documents based on the query
    const results = dbContent[collection].filter((item: any) => {
        return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
    });

    // Apply projection to each result
    if (Object.keys(projection).length > 0) {
        return results.map((item: any) => {
            const projectedItem = { ...item };
            Object.entries(projection).forEach(([key, value]) => {
                if (value === 0) {
                    delete projectedItem[key]; // Exclude the field
                }
            });
            return projectedItem;
        });
    }

    return results; // Return filtered results without projection
}


// Find a single document by a field
export async function findOne(
    collection: string,
    query: any,
    projection: any = {} // Fields to include or exclude
) {
    const dbContent = await readDB();

    // Ensure the collection exists
    if (!dbContent[collection]) {
        throw new Error(`Collection ${collection} not found`);
    }

    // Find the first matching item based on the query
    const result = dbContent[collection].find((item: any) => {
        return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
    });

    if (!result) {
        return null; // Return null if no match is found
    }

    // Apply projection (include or exclude fields)
    if (Object.keys(projection).length > 0) {
        const projectedResult = { ...result };

        Object.entries(projection).forEach(([key, value]) => {
            if (value === 0) {
                delete projectedResult[key]; // Exclude the field
            }
        });

        return projectedResult;
    }

    return result; // Return the result if no projection is specified
}

export async function updateOne(collection: string, query: any, update: any) {
    const dbContent = await readDB();

    if (!dbContent[collection]) {
        throw new Error(`Collection ${collection} not found`);
    }

    // Find the document that matches the query
    const docIndex = dbContent[collection].findIndex((item: any) => {
        return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
    });

    if (docIndex === -1) {
        throw new Error('No document found matching the query');
    }

    // Update the document with the new data
    const updatedDocument = {
        ...dbContent[collection][docIndex],
        ...update, // Update only the fields passed in the update object
    };

    // Replace the old document with the updated document
    dbContent[collection][docIndex] = updatedDocument;

    // Write the updated data back to db.json
    await writeDB(dbContent);

    return updatedDocument; // Return the updated document
}

export async function updateMany(collection: string, query: any, update: any) {
    const dbContent = await readDB();

    if (!dbContent[collection]) {
        throw new Error(`Collection ${collection} not found`);
    }

    // Find documents matching the query
    const updatedDocuments = dbContent[collection].map((item: any) => {
        const isMatch = Object.entries(query).every(([key, value]) => String(item[key]) === String(value));

        if (isMatch) {
            // Apply the update if the document matches the query
            return { ...item, ...update };
        }

        return item; // If the document doesn't match, return it unchanged
    });

    // Write the updated data back to db.json
    await writeDB({ ...dbContent, [collection]: updatedDocuments });

    return updatedDocuments.filter((item: any) => {
        // Return only the updated documents
        return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
    });
}

// Delete a document by ID
export async function deleteOne(collection: string, id: any) {
    const dbContent = await readDB();
    const collectionData = dbContent[collection] || [];

    const index = collectionData.findIndex((item: any) => item.id === id);
    if (index === -1) {
        return null; // Document not found
    }

    const [deleted] = collectionData.splice(index, 1); // Remove the document
    await writeDB(dbContent);

    return deleted; // Return the deleted document
}