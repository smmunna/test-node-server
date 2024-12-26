import QueryBuilder from '../../lib/QueryBuilder';
import User from './user.interface';
import userModel from './user.model';

// Creating new user
const createUserToDB = async (user: User) => {
  const result = await userModel.create(user);
  return result;
};

// Getting all users
const getAllUsers = async () => {
  const query = { email: 'tanydx@gmail.com' }; // Match all users
  const projection = { password: 0, role: 0 }; // Exclude password and role
  return await QueryBuilder.Paginate(userModel, {}, projection, 1, 2, { username: -1 });
};

export const UserService = {
  createUserToDB,
  getAllUsers,
};
