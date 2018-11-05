let db = require('../utils/db');
let Sequelize = require('sequelize');

let Category = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    caption: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    category_index: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = Category;