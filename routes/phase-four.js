var express = require('express');
var router = express.Router();

var values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Four: Google API',
  search: '/v4/search',
  disabled: 'true',
  showImport: 'true',
  scriptLocation: '/javascripts/import.js'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', values);
});

router.get('/search', function(req, res) {
  res.render('search_nav', values);
});

module.exports = router;
