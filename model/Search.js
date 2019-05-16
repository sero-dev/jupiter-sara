const Sequelize = require('sequelize');
const sequelize = require('../config/dbHelper');

class Search extends Sequelize.Model {}
Search.init(
  {
    terms: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    searchDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    timeToSearch: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  },
  {
    modelName: 'search',
    tableName: 'search',
    sequelize
  }
);

module.exports = Search;
