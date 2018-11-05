let firebase = require('firebase');

module.exports = {
    isAuthenticated: function (req, res, next) {
      let user = firebase.auth().currentUser;
      if (user !== null) {
        req.user = user;
        next();
      } else {
        res.redirect('/');
      }
    },
  }