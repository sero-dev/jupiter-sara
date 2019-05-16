const Sequelize = require('sequelize');
const sequelize = require('../config/dbHelper');

class Page extends Sequelize.Model {}
Page.init(
  {
    url: {
      type: Sequelize.STRING(2000),
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    lastModified: {
      type: Sequelize.DATE,
      allowNull: true
    },
    lastIndexed: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    timeToIndex: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  },
  {
    modelName: 'page',
    tableName: 'page',
    sequelize
  }
);

module.exports = Page;
