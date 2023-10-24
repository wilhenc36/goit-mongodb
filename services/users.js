const User = require("../models/users");

const findUser = async () => {
  try {
    const users = await User.find();
    console.log(users);

    return {
      success: true,
      result: users,
      message: "List of users",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const createUser = async (Data) => {
  try {
    console.log(Data);
    const userRegistered = await User.create(Data);

    console.log(userRegistered);

    if (!userRegistered) {
      return {
        success: false,
        result: null,
        message: "There is an error try creating user.",
      };
    }

    return {
      success: true,
      result: userRegistered,
      message: "User registered successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  findUser,
  createUser,
};
