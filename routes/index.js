const express = require('express');
const router = express.Router();

let values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Two: Fixed List',
  search: './search/',
  type: 'text',
  value: 'The Future',
  disabled: true,
  showImport: false
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', values);
});

router.get('/search', function(req, res, next) {
  res.render('fixed_list', values);
});

module.exports = router;
