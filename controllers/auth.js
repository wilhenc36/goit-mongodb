const service = require("../services/auth");

const signIn = async (req, res) => {
  try {
    console.log(req.body);

    const { success, result, message } = await service.signIn(req.body);

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
  signIn,
};
