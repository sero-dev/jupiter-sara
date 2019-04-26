var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Jupiter Search',
    phase: 'Currently using Phase Four: Google API'
  });
});

module.exports = router;