const axios = require("axios");
const crypto = require("crypto");

const validateLeak = async (req, res, next) => {
  const password = req.body.password;

  const hash = crypto.createHash("sha1").update(password).digest("hex");
  const prefix = hash.slice(0, 5); // retirar os primeiros 5 chars
  const suffix = hash.slice(5); // obter o resto da hash para fazer a comparação

  const checkPwned = await axios.get(
    "https://api.pwnedpasswords.com/range/" + prefix
  );
  /**
   * @description formatar a resposta e dividir por linhas, retirando tudo para a frente de :
   */
  var pwndPasswords = checkPwned.data;
  pwndPasswords = pwndPasswords.split("\r\n");
  pwndPasswords = pwndPasswords.map((pswd) => pswd.slice(0, pswd.indexOf(":")));

  /**
   * @description verificar se já houve leak
   */
  var isPwnd = 0;
  pwndPasswords.forEach((pswd) => {
    if (suffix === pswd.toLowerCase()) {
      console.log("powned");
      isPwnd = 1;
    }
  });

  if (isPwnd === 1) {
    return res.status(400).json({ error: "Leaked password" });
  } else {
    next();
  }
};

module.exports = validateLeak;
