const validatePassword = async (req, res, next) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).json({ error: "Password vazia" });
  }

  const valPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // 1 digito, 1 letra minuscula, 1 letra maiuscula e no minimo 6 caracteres
  if (password.match(valPwd)) {
    next();
  } else {
    return res.status(400).json({ error: "Password invalida" });
  }
};

module.exports = validatePassword;
