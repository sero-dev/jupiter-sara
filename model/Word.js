const Sequelize = require('sequelize');
const sequelize = require('../config/dbHelper');

class Word extends Sequelize.Model {}
Word.init(
  {
    wordName: {
      type: Sequelize.STRING(2000),
      allowNull: false
    }
  },
  {
    modelName: 'word',
    tableName: 'word',
    sequelize
  }
);

module.exports = Word;
