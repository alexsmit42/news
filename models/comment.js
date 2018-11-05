let db = require('../utils/db');
let Sequelize = require('sequelize');

let Article = require('./article');

let Comment = db.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    is_confirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    article_id: {
        type: Sequelize.INTEGER
    }
});

module.exports = Comment;