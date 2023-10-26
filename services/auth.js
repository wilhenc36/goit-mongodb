const bcrypt = require("bcrypt");
const User = require("../models/users");

const signIn = async (Data) => {
  try {
    const user = await User.findOne({
      email: Data.email,
    });

    if (user) {
      return {
        success: false,
        result: null,
        message: "There was already an user with that email.",
      };
    }

    //Hash password
    const salt = await bcrypt.genSalt();
    Data.password = await bcrypt.hash(Data.password, salt);

    /**
     * pedrito@email.com
     * 123
     *
     * bcrypt.compare()
     */

    console.log(Data.password);

    const createdUser = await User.create(Data);

    return {
      success: true,
      result: createdUser,
      message: "Sign-in successfully.",
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
  signIn,
};
