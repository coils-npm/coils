'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
	    'allowNull': false,         // 是否允许为NULL
	    'unique': true              // 字段是否UNIQUE
    }
  }, {
    underscored: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};