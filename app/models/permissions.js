const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Permissions",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: "description_UNIQUE",
      },
    },
    {
      sequelize,
      tableName: "permissions",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "description_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "description" }],
        },
      ],
    }
  );
};
