import User from "./user.interface"
import userModel from "./user.model"


const createUserToDB = async (user: User) => {
    const result = await userModel.create(user)
    return result
}

export const UserService = {
    createUserToDB,
}