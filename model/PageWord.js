const Sequelize = require('sequelize');
const sequelize = require('../config/dbHelper');
const Page = require('./Page');
const Word = require('./Word');

class PageWord extends Sequelize.Model {}
PageWord.init(
  {
    pageId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wordId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    freq: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    modelName: 'PageWord',
    tableName: 'page_word',
    sequelize
  }
);

PageWord.hasMany(Page, { foreignKey: 'id' });
PageWord.hasMany(Word, { foreignKey: 'id' });

module.exports = PageWord;
