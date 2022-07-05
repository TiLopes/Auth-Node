const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "GroupPermissions",
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "groups",
          key: "id",
        },
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "permissions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "group_permissions",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "group_id" }, { name: "permission_id" }],
        },
        {
          name: "permission_FK_idx",
          using: "BTREE",
          fields: [{ name: "permission_id" }],
        },
      ],
    }
  );
};
