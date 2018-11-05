let Jimp = require('jimp');
let moment = require('moment');

let Model = require('../utils/model');

let adminController = {
    articleListPage: async (req, res) => {
        let [articles, categories] = await Promise.all([Model.getArticles(), Model.getCategories()]);

        let counts = {
            publish: 0,
            archive: 0
        };

        let data = {}

        categories.map(category => {
            data[category.id] = category;
            data[category.id]['articles'] = [];
        });

        articles.map(article => {
            if (data[article.category_id] === undefined) {
                return;
            }

            article.create_date = moment(article.create_date, 'YYYY-MM-DD').format('DD.MM.YYYY');

            data[article.category_id]['articles'].push(article);

            if (article.is_archive) {
                counts.archive++;
            } else {
                counts.publish++;
            }
        });

        data = Object.values(data);

        res.render('admin/index', {
            counts, data
        });
    },

    commentsPage: async (req, res) => {
        let [newComments, confirmComments] = await Promise.all([Model.getComments(0, 2), Model.getComments(0, 1)]);

        newComments = await Promise.all(newComments.map(async comment => {
            comment.article = await Model.getArticle(comment.article_id);
            comment.create_date = comment.create_date.substr(0, 19);

            return comment;
        }));

        confirmComments = await Promise.all(confirmComments.map(async comment => {
            comment.article = await Model.getArticle(comment.article_id);
            comment.create_date = comment.create_date.substr(0, 19);

            return comment;
        }));

        res.render('admin/comments', {
            newComments, confirmComments
        });
    },

    createCategory: (req, res) => {
        let query = req.query;

        let caption = query.caption || '';
        let url = query.url || '';

        // Category.create({ caption, url });
    },

    createArticle: async (req, res) => {
        let articleID = req.params.id || 0;

        let article = {};

        if (articleID) {
            article = await Model.getArticle(articleID);
        }

        let categories = await Model.getCategories();

        res.render('admin/article', {
            article, categories
        });
    },

    categoryList: async (req, res) => {
        let categories = await Category.findAll();
        console.log(categories);
    },

    confirmComment: (req, res) => {
        let commentID = req.params.id || 0;

        Model.confirmComment(commentID).then(() => {
            res.redirect('/admin/comments');
        });
    },

    deleteArticle: (req, res) => {
        let articleID = req.params.id || 0;

        Model.deleteArticle(articleID).then(() => {
            res.redirect('/admin');
        });
    },

    deleteComment: (req, res) => {
        let commentID = req.params.id || 0;

        Model.deleteComment(commentID).then(() => {
            res.redirect('/admin/comments');
        });
    },

    saveArticle: (req, res) => {
        let title = req.body.title || '';
        let preview = req.body.preview || '';
        let content = req.body.content || '';
        let category_id = parseInt(req.body.section) || 0;
        let is_archive = req.body.type == 'publish' ? false : true;
        let is_important = req.body.is_important ? true : false;
        let create_date = req.body.date || '';
        let articleID = parseInt(req.body.id) || 0;

        Model.saveArticle({
            title, preview, content, category_id, is_archive, is_important, create_date
        }, articleID).then(article => {
            let img = req.files.img || false;
            if (img) {
                Jimp.read(img.data).then(image => {
                    image.write(`./public/files/${article.id}.jpg`);
                });
            }

            let imgPreview = req.files.img_preview || false;
            if (imgPreview) {
                Jimp.read(imgPreview.data).then(image => {
                    image.write(`./public/files/${article.id}_preview.jpg`);
                });
            }

            res.redirect('/admin/article/' + article.id);
        })
    }
};

module.exports = adminController;