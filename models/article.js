let db = require('../utils/db');
let Sequelize = require('sequelize');

let Category = require('./category');

let Article = db.define('article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    preview: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    content: {
        type: Sequelize.TEXT
    },
    is_archive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    is_important: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    create_date: {
        type: Sequelize.STRING
    },
    category_id: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Article;