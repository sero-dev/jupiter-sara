const Sequelize = require('sequelize');

// module.exports = new Sequelize('localdb', 'root', 'Anthony13;', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
//   define: {
//     timestamps: false,
//     freezeTableName: true
//   }
// });

module.exports = new Sequelize('rose4441', 'rose4441', '15234441;', {
  port: 3306,
  host: '149.4.211.180',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true
  }
});
