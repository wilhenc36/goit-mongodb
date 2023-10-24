const servive = require("../services/users");

const findUser = async (req, res) => {
  try {
    const { success, result, message } = await servive.findUser();

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const createUser = (req, res) => {
  try {
    const { success, result, message } = servive.createUser(req.body);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(201).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, result, message } = await servive.updateUser(id, req.body);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, result, message } = await servive.deleteUser(id);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
