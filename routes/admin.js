const express = require('express');
const router = express.Router();
const webCrawler = require('../web-crawler');
const Search = require('../model/Search');

let values = {
  title: 'Jupiter Admin',
  results: []
};

router.get('/', function(req, res) {
  res.render('admin', values);
});

router.get('/history', function(req, res) {
  let result = [];
  Search.findAll({}).then(rows => {
    rows.forEach(element => {
      result.push(element.toJSON());
    });

    values.results = result;
    res.render('history', values);
  });
});

router.post('/index', function(req, res) {
  webCrawler([req.body.q]);
  res.render('admin', values);
});

module.exports = router;
