const User = require("../models").User;

const userInfoGET = async (req, res) => {
  const user = await User.findByPk(req.params.userId, {
    attributes: { exclude: ["password", "authToken"] },
  });

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json({ user });
};

const personalInfoGET = async (req, res) => {
  const token = req.header("auth-token");
  const user = await User.findOne({
    where: {
      authToken: token,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json({
    user: {
      id: user.id,
      group_id: user.group_id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};

module.exports = { userInfoGET, personalInfoGET };
