const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const $ = require("cheerio");
const url = "https://www.moneycontrol.com/";

let arrOfObj = [];

// middlewares

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.get("/", (req, res) => {
  puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage();
    })
    .then(function(page) {
      return page.goto(url).then(function() {
        return page.content();
      });
    })
    .then(function(html) {
      $(".tabs_nwsconlist li a", html).each(function() {
        let obj = {};
        obj.link = $(this).attr().href;
        obj.title = $(this).attr().title;
        obj.owner = url;
        arrOfObj.push(obj);
      });
      res.send(arrOfObj);
      // res.render("index", { siteData: arrOfObj });
      arrOfObj = [];
    })
    .catch(function(err) {
      console.log(err);
    });
});

const port = process.env.PORT || 5200;

app.listen(port, () => {
  console.log("server started on " + port);
});
