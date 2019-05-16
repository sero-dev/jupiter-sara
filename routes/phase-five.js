const express = require('express');
const router = express.Router();
const Search = require('../model/Search');
const sequelize = require('../config/dbHelper');

let values = {
  title: 'Jupiter Search',
  phase: 'Currently using Phase Five: Our Search Engine',
  search: '/v5/search',
  showImport: 'true',
  showOptions: 'true',
  results: {},
  scriptLocation: '/javascripts/import.js'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', values);
});

router.get('/search/', function(req, res) {
  let query = req.query.q;
  let casei = 'caseinsensitive' in req.query ? true : false;
  let partial = 'partial' in req.query ? true : false;

  values.title = `${query} - Jupiter Search`;
  let { terms, count, searchDate, timeToSearch } = {};
  terms = query;
  param = { query: query, casei: casei, partial: partial };

  let start = Date.now();
  getSearchResults(param, rows => {
    let sites = [];
    terms = query;
    count = rows.length;
    timeToSearch = (Date.now() - start) / 1000;

    rows.forEach(element => {
      sites.push(element);
    });

    values.results = sites;

    Search.create({ terms, count, searchDate, timeToSearch }).then(() => {
      res.render('results', values);
    });
  });
});

function getSearchResults(param, callback) {
  let query = `SELECT P.url, P.title, P.description 
  FROM page_word AS PW 
    INNER JOIN page AS P
      ON PW.pageId = P.id
    INNER JOIN word AS W
      ON PW.wordId = W.id `;

  if (param.casei)
    query = query.concat(` WHERE W.wordName = "${param.query}" `);
  else
    query = query.concat(
      ` WHERE W.wordName = "${param.query}" COLLATE utf8mb4_0900_as_cs  `
    );
  if (param.partial)
    query = query.concat(` AND W.wordName LIKE '%${param.query}%' `);

  query.concat(` ORDER BY freq DESC`);

  sequelize.query(query).then(([results, metadata]) => {
    callback(results);
  });
}

module.exports = router;
