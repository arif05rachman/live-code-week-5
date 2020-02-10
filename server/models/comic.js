'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Comic extends Model{}
  Comic.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
}, {sequelize})
  Comic.associate = function(models) {
    // associations can be defined here
    // Comic.belongsTo(models.User)
  };
  return Comic;
};