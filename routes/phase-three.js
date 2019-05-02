const express = require('express');
const router = express.Router();

let values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Three: From File',
  search: '/v3/search',
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
