const User = require("../models").User;
const groupPerm = require("../models").GroupPermissions;

const verifyPermission = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(403).json({ error: "Invalid token" });
  }

  const user = await User.findOne({ where: { authToken: token } });
  console.log(user.id);

  if (!user) {
    return res.status(403).json({ error: "Invalid user token" });
  }

  const acl = await groupPerm
    .findAll(
      { where: { group_id: user.group_id } },
      { attributes: ["permission_id"] }
    )
    .then((mapACL) => {
      var x = mapACL.map((perm) => perm.permission_id);
      return x;
    });

  console.log(acl);

  const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);

  const pathSplit = url.pathname.split("/");
  console.log(pathSplit);
  const action = pathSplit[2];
  const spec = pathSplit[3];
  const fullPerm = action + ":" + spec;
  console.log(fullPerm);

  if (acl.includes(fullPerm.toLowerCase())) {
    next();
  } else {
    return res.status(401).json({ error: "Invalid permission" });
  }
};

module.exports = verifyPermission;
