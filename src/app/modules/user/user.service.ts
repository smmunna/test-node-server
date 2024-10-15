import User from "./user.interface"
import userModel from "./user.model"

// Creating new user
const createUserToDB = async (user: User) => {
    const result = await userModel.create(user)
    return result
}

// Getting all users
const getAllUsers = async () => {
    const users = await userModel.find({}, { password: 0, role: 0 }) //not showing password and role field
    return users
}

export const UserService = {
    createUserToDB,
    getAllUsers
}