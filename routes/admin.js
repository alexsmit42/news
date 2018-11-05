let express = require('express');
let router = express.Router();

let admin = require('../controllers/admin');

router.get('/', admin.articleListPage);
router.get('/article/delete/:id', admin.deleteArticle);
router.get('/article/:id?', admin.createArticle);
router.post('/article', admin.saveArticle);
router.get('/comments', admin.commentsPage);
router.get('/comment/delete/:id', admin.deleteComment);
router.get('/comment/confirm/:id', admin.confirmComment);
// router.get('/category', admin.createCategory);
// router.get('/categories', admin.categoryList);

module.exports = router;
