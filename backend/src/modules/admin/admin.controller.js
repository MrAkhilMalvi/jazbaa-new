import { getUsers } from "./admin.service.js";

export const listUsers = async (req, res, next) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};