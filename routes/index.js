const express = require('express');
const router = express.Router();

let values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Two: Fixed List',
  search: '/search',
  value: 'The Future',
  disabled: 'true',
  showImport: 'true',
  scriptLocation: '/javascripts/import.js'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', values);
});

router.get('/search', function(req, res) {
  values.title = 'The Future - Jupiter Search'
  res.render('fixed_list', values);
});

module.exports = router;
