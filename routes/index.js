let express = require('express');
let router = express.Router();

let site = require('../controllers/site');

router.get('/', site.mainPage);
router.get('/article/:id', site.articlePage);
router.post('/comment', site.saveComment);
router.post('/login', site.login);
router.get('/:category', site.categoryPage);

module.exports = router;
