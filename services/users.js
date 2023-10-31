const User = require("../models/users");

const findUser = async (skip, limit) => {
  try {
    const countUser = await User.find().count();
    const users = await User.find().skip(skip).limit(limit);
    console.log(users);

    return {
      success: true,
      result: {
        countUser,
        users
      },
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

const findIdUser = async id => {
  try {
    const user = await User.findById(id);
    console.log(user);

    if (!user) {
      return {
        success: false,
        result: null,
        message: 'Not found user',
      };
    }

    return {
      success: true,
      result: user,
      message: 'User',
    };
  } catch (error) {
    console.log(error);

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

const updateUser = async (id, data) => {
  try {
    console.log(data);
    const user = await User.findByIdAndUpdate(id, data);

    console.log(user);

    if (!user) {
      return {
        success: false,
        result: null,
        message: "There was an error to update user.",
      };
    }

    return {
      success: true,
      result: user,
      message: "The user was updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);

    console.log(user);

    return {
      success: true,
      result: user,
      message: "The user was deleted successfully.",
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
  findIdUser,
  createUser,
  updateUser,
  deleteUser,
};
