const https = require('https');
const login = require('./credentials');

function getSearchResult(query) {
  const url = `https://www.googleapis.com/customsearch/v1/?key=${login.key}&cx=${login.engineID}&q=${query}`;
  https.get(url, );
}

module.exports = getSearchResult();
