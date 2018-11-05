let { Category, Article, Comment } = require('../models');

let Model = {

    confirmComment: (id) => {
        return Comment.update({ is_confirm: true }, { where: { id } });
    },
    
    deleteArticle: (id) => {
        return Article.destroy({ where: { id } });
    },

    deleteComment: (id) => {
        return Comment.destroy({ where: { id } });
    },

    getArticle: (id) => {
        return Article.findOne({ where: { id }, raw: true });
    },

    getArticles: (categoryID = 0, important = 0, publish = 0) => {
        let conditions = {};

        if (categoryID) {
            conditions.category_id = categoryID;
        }

        switch (important) {
            case 1:
                conditions.is_important = true;
                break;
            case 2:
                conditions.is_important = false;
                break;
        }

        switch (publish) {
            case 1:
                conditions.is_archive = true;
                break;
            case 2:
                conditions.is_archive = false;
                break; 
        }

        return Article.findAll({ where: conditions, raw: true, order: [['create_date', 'DESC']] });
    },

    getCategory: (id) => {
        return Category.findOne({ where: { id }, raw: true });
    },

    getCategoryByUrl: (categoryName) => {
        return Category.findOne({ where: { url: categoryName }, raw: true });
    },

    getCategories: () => {
        return Category.findAll({ raw: true });
    },

    getComments: (articleID = 0, is_confirm = 0) => {
        let conditions = {};

        if (articleID) {
            conditions.article_id = articleID;
        }

        switch (is_confirm) {
            case 1:
                conditions.is_confirm = true;
                break;
            case 2:
                conditions.is_confirm = false;
                break; 
        }

        return Comment.findAll({where: conditions, raw: true, order: [['id', 'ASC']] });
    },

    saveArticle: async (data, id = 0) => {
        if (id) {
            await Article.update( data , {where: { id }});
            return Article.findOne({ where: { id }, raw: true });
        }

        return Article.create( data );
    },

    saveCategory: async (data, id = 0) => {
        if (id) {
            let category = await Category.findOne(id);
            return category.update( data );
        } else {
            return Category.create({ data });
        }
    },

    saveComment: (data, id = 0) => {
        return Comment.create(data);
    },
}

module.exports = Model;