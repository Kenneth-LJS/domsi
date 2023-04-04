# Domsi

Domsi is a powerful web scraping library that allows you to query HTML elements based on DOM hierarchy, element attributes, and CSS styles. Works across \*all\* automated browsers, so long as they allow execution of arbitrary JavaScript. That includes non-Node.JS browsers such as Selenium too!

## Installation

### For Node.JS projects

Run `npm install domsi`.

You can use Domsi by importing `domsiFind` or `domsiFindAll` from the `domsi` module.

```javascript
const { domsiFind } = require('domsi');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://kenneth-ljs.github.io/article/introduction-to-domsi/static/kiwi-chirp/');

    const document = await page.$('html');

    const results = document.evaluate(() => domsiFind({ tag: 'img' }));

    console.log(results);

    await browser.close();
})();
```



## Usage

## Query Selector

for more info blah blah refer to docs
