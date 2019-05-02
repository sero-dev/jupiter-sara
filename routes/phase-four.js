const express = require('express');
const router = express.Router();
const search = require('../search.js');

let values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Four: Google API',
  search: '/v4/search',
  showImport: 'true',
  scriptLocation: '/javascripts/import.js'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', values);
});

router.get('/search', function(req, res) {
  let data = search.getGoogleResults();
  res.render('search_nav', values);
});

module.exports = router;
