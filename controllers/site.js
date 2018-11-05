let createError = require('http-errors');
let firebase = require('firebase');
let moment = require('moment');

let Model = require('../utils/model');

let siteController = {

    articlePage: async (req, res, next) => {
        let id = parseInt(req.params.id) || 0;
    
        if (!id) {
            next(createError(404));
            return;
        }

        let [article, categories] = await Promise.all([Model.getArticle(id), Model.getCategories()]);
        let [category, comments] = await Promise.all([Model.getCategory(article.category_id), Model.getComments(article.id)]);

        res.render('article', {
            article, category, categories, comments
        });
    },

    categoryPage: async (req, res, next) => {
        let categoryName = req.params.category || '';

        let [currentCategory, categories] = await Promise.all([Model.getCategoryByUrl(categoryName), Model.getCategories()]);
        
        if (!currentCategory) {
            next(createError(404));
            return;
        }

        let articles = await Model.getArticles(currentCategory.id, 0, 2);
        
        res.render('category', {
            currentCategory, categories, articles
        });
    },

    login: (req, res) => {
        let email = req.body.email || '';
        let password = req.body.password || '';
    
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            res.redirect('/admin');
        }).catch(error => {
            res.redirect('/');
        });
    },

    mainPage: async (req, res) => {
        let [categories, importantArticles, otherArticles] = await Promise.all([
            Model.getCategories(), Model.getArticles(0, 1, 2), Model.getArticles(0, 2, 2)
        ]);

        let mainArticle = importantArticles.splice(0, 1)[0] || {};

        res.render('index', {
            categories, mainArticle, importantArticles, otherArticles
        });
    },

    saveComment: (req, res) => {
        let username = req.body.username || '';
        let content = req.body.content || '';
        let article_id = req.body.article_id || '';

        Model.saveComment({username, content, article_id}).then(comment => {
            res.redirect('/article/' + article_id);
        });
    },
};

module.exports = siteController;