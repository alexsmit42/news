let Sequelize = require('sequelize');

let sequelize = new Sequelize('mainDB', null, null, {
    dialect: 'sqlite',
    storage: './db/news.sqlite',
  });

module.exports = sequelize;