const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "email_UNIQUE",
        validate: {
          notEmpty: { args: true, msg: "Email vazio" },
          async userExist(value) {
            const users = await User.findOne({ where: { email: value } });
            if (users) {
              throw new Error("Email duplicado");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // validate: {
        //   notEmpty: { args: true, msg: "Password vazia" },
        //   len: { args: 5, msg: "Introduza no minimo 5 caracteres" },
        // },
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "groups",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      authToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "authToken_UNIQUE",
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "email_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
        {
          name: "group_FK_idx",
          using: "BTREE",
          fields: [{ name: "group_id" }],
        },
        {
          name: "authToken_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "authToken" }],
        },
      ],
    }
  );
  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.getDataValue("password"), salt);
    user.setDataValue("password", hash);
  });

  User.login = async function (email, password) {
    if (!email) {
      throw new Error("Email vazio");
    }

    if (!password) {
      throw new Error("Password vazia");
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("Esse email nao esta registado");
    }

    const auth = bcrypt.compareSync(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Password errada");
  };

  User.saveToken = async (id, token) => {
    await User.update({ authToken: token }, { where: { id: id } });
  };

  User.removeToken = async (user, token) => {
    await User.update({ authToken: null }, { where: { id: user.id } });
    console.log("Apagado com sucesso");
  };

  return User;
};
