class QueryBuilder {
    // A reusable method for executing queries
    static async executeQuery(model: any, query: object, projection?: object) {
        try {
            const result = await model.find(query, projection);
            return result;
        } catch (error: any) {
            throw new Error(`Query Execution Failed: ${error.message}`);
        }
    }

    /**
     * @description
     * Example usage: return await QueryBuilder.Paginate(userModel, {}, projection,1, 2, {username: -1});
     * */
    static async Paginate(
        model: any,
        query: object,
        projection: object = {},
        page: number = 1,
        pageSize: number = 10,
        sort: object = {} // Optional sorting parameter
    ) {
        try {
            const skip = (page - 1) * pageSize;
            const limit = pageSize;

            const data = await model.find(query, projection).sort(sort).skip(skip).limit(limit);
            const totalRecords = await model.countDocuments(query);

            return {
                data,
                pagination: {
                    totalRecords,
                    currentPage: page,
                    totalPages: Math.ceil(totalRecords / pageSize),
                    pageSize,
                },
            };
        } catch (error: any) {
            throw new Error(`Pagination Failed: ${error.message}`);
        }
    }


    // A reusable method for finding a single document
    static async findOne(model: any, query: object, projection?: object) {
        try {
            const result = await model.findOne(query, projection);
            if (!result) {
                throw new Error('No document found matching the query.');
            }
            return result;
        } catch (error: any) {
            throw new Error(`Find One Failed: ${error.message}`);
        }
    }

    /**
     * @description
     * Example usage: await QueryBuilder.create(userModel, { name: 'John Doe', email: 'john@example.com' });
     * */
    static async create(model: any, data: object) {
        try {
            const result = await model.create(data);
            return result;
        } catch (error: any) {
            throw new Error(`Create Failed: ${error.message}`);
        }
    }

    /**
     * @description
     * Example usage: 
     * await QueryBuilder.insertMany(userModel, [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },]);
     * */
    static async insertMany(model: any, data: object[]) {
        try {
            const result = await model.insertMany(data);
            return result;
        } catch (error: any) {
            throw new Error(`Insert Many Failed: ${error.message}`);
        }
    }

    /**
     * @description
     * Example usage: await QueryBuilder.updateOne(userModel, { email: 'john@example.com' }, { name: 'John Smith' });
     * */
    static async updateOne(model: any, query: object, update: object) {
        try {
            const result = await model.updateOne(query, update, { new: true });
            return result;
        } catch (error: any) {
            throw new Error(`Update One Failed: ${error.message}`);
        }
    }

    /**
     * @description
     * Example usage: await QueryBuilder.deleteOne(userModel, { email: 'john@example.com' });
     * */
    static async deleteOne(model: any, query: object) {
        try {
            const result = await model.deleteOne(query);
            return result;
        } catch (error: any) {
            throw new Error(`Delete One Failed: ${error.message}`);
        }
    }


    /**
     * @description
     * Example usage: await QueryBuilder.deleteMany(userModel, { isActive: false });
     * */
    static async deleteMany(model: any, query: object) {
        try {
            const result = await model.deleteMany(query);
            return result;
        } catch (error: any) {
            throw new Error(`Delete Many Failed: ${error.message}`);
        }
    }

    /**
   * @description
   * Example usage: const activeUsers = await QueryBuilder.count(userModel, { isActive: true });
   * */
    static async count(model: any, query: object) {
        try {
            const count = await model.countDocuments(query);
            return count;
        } catch (error: any) {
            throw new Error(`Count Failed: ${error.message}`);
        }
    }

    /**
     * @description
     * Example usage: const roles = await QueryBuilder.distinct(userModel, 'role');
     * */
    static async distinct(model: any, field: string, query: object = {}) {
        try {
            const result = await model.distinct(field, query);
            return result;
        } catch (error: any) {
            throw new Error(`Distinct Query Failed: ${error.message}`);
        }
    }
    


}

export default QueryBuilder;
