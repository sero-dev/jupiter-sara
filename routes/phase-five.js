const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Jupiter Search',
    phase: 'Currently using Phase Five: Our Search Engine'
  });
});

module.exports = router;
