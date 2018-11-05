let db = require('./utils/db');
let { Category, Article, Comment } = require('./models');

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    Category.sync({force: true}).then(() => {
      Category.bulkCreate([
        {caption: 'Происшествия', url: 'accidents'},
        {caption: 'Спорт', url: 'sport'},
        {caption: 'Культура', url: 'culture'},
        {caption: 'Фауна', url: 'fauna'},
      ]);
    });
    Article.sync({force: true});
    Comment.sync({force: true});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

