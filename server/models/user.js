'use strict';
const encryptPassword = require('../helpers/generatePassword')

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { 
    hooks :{
    beforeCreate(user, options){
      user.password = encryptPassword(user.password)
    }},
    sequelize})
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comic)
  };
  return User;
};
