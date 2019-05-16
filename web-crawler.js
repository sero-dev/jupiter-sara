const puppeteer = require('puppeteer');
const $ = require('cheerio');
const path = require('path');
const Page = require('./model/Page');
const Word = require('./model/Word');
const PageWord = require('./model/PageWord');

async function getDataFromURL(urls) {
  let start = Date.now();
  let badlinks = [];
  while (urls.length > 0) {
    let url = path.normalize(urls.shift());

    while (
      (await isURLinDatabase(url)) ||
      path.extname(url) == '.pdf' ||
      url in badlinks
    ) {
      if (urls.length == 0) {
        let time = (Date.now() - start) / 1000;
        console.log(`Index completed in ${time} seconds.`);
        return;
      }
      url = path.normalize(urls.shift());
    }

    const fetchedData = await downloadURL(url).catch(error => {
      console.log(`[Timeout]: ${url}`);
      badlinks.push(url);
    });
    if (fetchedData == null || fetchedData.header.status == '404') continue;
    const data = extractInfo(fetchedData, url);
    await addToDatabase(data[0], data[2]);
    urls = urls.concat(data[1]);

    console.log(`Completed Index of [${url}]`);
  }

  let time = (Date.now() - start) / 1000;
  console.log(`Index completed in ${time} seconds.`);
}

async function downloadURL(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const response = await page.goto(url);
  const html = await page.content();
  const header = response.headers();
  await browser.close();

  return { header, html };
}

function extractInfo(fetchedData, site) {
  const html = fetchedData.html;
  const header = fetchedData.header;

  let { url, title, description, lastModified, lastIndexed, timeToIndex } = {};
  let start = Date.now();

  url = site;
  title = $('title', html).text();
  description = $('meta[name="description"]', html).attr('content');

  if (description != null && description.length > 200)
    description = description.substring(0, 196) + '...';
  else if (description == null) {
    description = 'Description is unavailable';
  }

  timeToIndex = (Date.now() - start) / 1000;

  if (header.hasOwnProperty('last-modified')) {
    lastModified = new Date(header['last-modified'].split(',')[1]);
    lastModified = lastModified
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  links = scrapLinks(html, url);
  let words = scrapWords(html);

  return [
    { url, title, description, lastModified, lastIndexed, timeToIndex },
    links,
    words
  ];
}

async function addToDatabase(pageData, wordData) {
  const pageRow = await Page.create(pageData);

  Object.keys(wordData).forEach(async key => {
    let wordRow = await Word.findAll({
      where: {
        wordName: `"${key}"`
      }
    });

    if (wordRow.length == 0) {
      wordRow = await Word.create({ wordName: key });
      PageWord.create({
        pageId: pageRow.toJSON().id,
        wordId: wordRow.toJSON().id,
        freq: wordData[key]
      });
    } else {
      PageWord.create({
        pageId: pageRow.toJSON().id,
        wordId: wordRow[0].toJSON().id,
        freq: wordData[key]
      });
    }
  });
}

async function isURLinDatabase(link) {
  const values = await Page.findAll({
    where: {
      url: link
    }
  });

  let result = values.length > 0;
  if (result) result = (new Date() - values[0].lastIndexed) / 1000 < 86400;

  return result;
}

function scrapLinks(html, url) {
  let links = [];
  let baseurl = url.split('/')[0] + '/' + url.split('/')[1];

  $('a[href]', html).each((i, element) => {
    let link = element.attribs['href'];
    if (path.isAbsolute(link) && link != '/' && !(baseurl in links)) {
      links.push(path.join(baseurl, link));
    }
  });

  return links;
}

function addToObject(words, wordList) {
  wordList.forEach(element => {
    if (element in words) words[element] = words[element] + 1;
    else words[element] = 1;
  });
}

function extractTextFromElement(element, words) {
  let wordList = [];
  element.children.forEach(element => {
    if (element.type == 'text')
      element.data.split(/[\s\-\/]/).forEach(element => {
        let data = element.replace(/[\'\.\,\"\:\?]/g, '');
        data = data.replace(/\//g, ' ');
        if (data.trim() != '' && data.substr(0, 4) != 'http')
          wordList.push(data);
      });
  });

  addToObject(words, wordList);
}

function scrapWords(html) {
  let words = {};
  let elementToCheck = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'];

  elementToCheck.forEach(element => {
    $(element, html).each((index, element) =>
      extractTextFromElement(element, words)
    );
  });

  return words;
}

module.exports = getDataFromURL;
