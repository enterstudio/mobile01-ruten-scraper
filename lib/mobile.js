var fs = require('fs');
var cheerio = require('cheerio');
var rutenHtml = require('./data/mobile01').html;
var REGEX = /<a href="(.*?)".*?>(<.*?>)?(.*?)<\/a>/gi;
var CATE_NUM = 25;
var parseResult = {category: []};

$ = cheerio.load(rutenHtml, {decodeEntities: false});
var cateHtml = $('.cate-list').html();

while (match = REGEX.exec(cateHtml)) {
  parseResult.category.push({url: 'http://www.mobile01.com/' + match[1], title: match[3]});
}

fs.writeFile('./output/mobile01-category', JSON.stringify(parseResult, null, 2), 'utf8', function(err) {
  if (err) {
    console.error(new Error('Category file failed to be created.'));
  } else {
    console.log('Category file has been created successfully!');
  }
});
