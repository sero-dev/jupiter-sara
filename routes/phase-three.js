var express = require('express');
var router = express.Router();

var values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Three: From File',
  search: '/v3/search',
  disabled: 'true',
  showImport: 'true'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', values);
});

router.get('/search', function (req, res, next) {
  var result = 
  res.render('search_nav', values)
});

module.exports = router;