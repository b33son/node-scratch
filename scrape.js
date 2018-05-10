/*
 * File: /Users/michaelbeeson/Documents/VSCode/scratch/index.js
 */

const fetch = require("node-fetch");
const request = require("request");
const cheerio = require("cheerio");

function main() {
  const url = "https://www.reddit.com/top/";

  request(url, (err, res, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      ("");
      const allItems = $("#siteTable").children();
      let items = [];
      //  allItems.each(function(index) {
      //    items.push($("#siteTable").children().eq(index).children().eq(4).find("a.title").text());

      //  });
      for (let i = 0; i < allItems.length; i++) {
        let title = $("#siteTable")
          .children()
          .eq(i) //?
          .children() //?
          .eq(4)
          .find("a.title")
          .text();
        console.log(title); //?
        items.push(title);
      }
      console.log(items);
    }
  });
}

main();
