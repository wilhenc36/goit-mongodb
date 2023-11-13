const servive = require("../services/users");

const findUser = async (req, res) => {
  try {
    const { skip, limit } = req.query;

    console.log("Controller", skip, limit)
    const { success, result, message } = await servive.findUser(skip, limit);

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

const findIdUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { success, result, message } = await servive.findIdUser(id);

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
    console.log(req.file)

    const originalname = req.file.originalname;
    const filename = req.file.filename;

    const { success, result, message } = servive.createUser({
      ...req.body,
      originalname,
      filename
    });

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
  findIdUser,
  createUser,
  updateUser,
  deleteUser,
};
