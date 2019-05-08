const express = require('express');
const router = express.Router();
const login = require('../credentials');
const request = require('request');

let values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Four: Google API',
  search: '/v4/search',
  showImport: 'true',
  results: {},
  scriptLocation: '/javascripts/import.js'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', values);
});

router.get('/search/', function(req, res) {
  const url = `https://www.googleapis.com/customsearch/v1/?key=${login.key}&cx=${login.engineID}&q=${req.query.q}`;
  values.title = `${req.query.q} - Jupiter Search`

  request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    values.results = json.items;
    res.render('results', values);
  })
});

module.exports = router;
