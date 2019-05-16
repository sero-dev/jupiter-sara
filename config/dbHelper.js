const Sequelize = require('sequelize');

module.exports = new Sequelize('localdb', 'root', 'Anthony13;', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true
  }
});
