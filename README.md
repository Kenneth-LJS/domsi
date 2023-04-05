# Domsi

Domsi is a powerful web scraping library that allows you to query HTML elements based on DOM hierarchy, element attributes, and CSS styles. Works across \*all\* automated browsers, so long as they allow execution of arbitrary JavaScript. That includes non-Node.JS browsers such as Selenium too!

## Installation

### For Node.JS projects

Run `npm install domsi`.

### For non-Node.JS projects

Download [/build/index.source.js](./build/index.source.js) and put that into your source code as a string. Evaluate the string in your automated browser before running Domsi queries.

## Usage

### For Node.JS projects

You can use Domsi by importing `initDomsi` from the `domsi` module. In the following example, we’re using the `puppeteer` library to interface with the browser.

```javascript
const { initDomsi } = require('domsi');
const puppeteer = require('puppeteer');

(async () => {
    // Load page with Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');

    // Initialize domsi in the browser page
    await page.evaluate(initDomsi());

    // Query the selector in the browser page
    // and return results
    const results = await page.evaluate(() => {
        return domsi.findAll({ tagName: 'img' }).map((result) => result.node.getAttribute('src'));
    });
    console.log(results);

    // Close Puppeteer
    await browser.close();
})();
```

#### Aliasing Domsi With A Different Variable Name

If you know the web page you’re scraping has an existing variable named `domsi`, then you can pass in a variable name in `initDomsi` to initialize it under a different variable name.

```javascript
await page.evaluate(initDomsi('domsiAlias'));

await page.evaluate(() => {
    return domsiAlias.findAll({ tagName: 'img' }).map((result) => result.node.getAttribute('src'));
});
```

#### Executing Domsi Anonymously

If you need to run a Domsi query without polluting the global environment, you can run it in an anonymous function. In this case, you no longer need to run the `initDomsi` function.

```javascript
const { runDomsiAnonymously } = require('domsi');

...

await page.evaluate(runDomsiAnonymously((domsi) => {
    return domsi.findAll({ tagName: 'img' }).map((result) => result.node.getAttribute('src'));
}));
```

When called like this, the Domsi library will be initialized in an anonymous function and the query is executed there. Each call will have to re-initialize the Domsi library, so if performance is critical, you are advised to use `initDomsi`.

### For non-Node.JS projects

Load the Domsi source file in your project and evaluate it in your automated browser before running Domsi queries. Here is an example in Python 3.

```python
from selenium import webdriver

domsi_src = '''Import Domsi source here'''

driver = webdriver.Chrome()
driver.get("https://www.google.com/")
driver.execute_script(domsi_src + 'window.domsi=domsi;')
results = driver.execute('''
    return domsi.findAll({ tagName: 'img' })
        .map((result) => result.node.getAttribute('src'));
''')
print(results)

driver.close()
```

If I have the time, I will make a Python wrapper for `initDomsi` and `runDomsiAnonymously` too.

## Query Selector

`domsi.find(domsiSelector, [element])`
Returns a `DomsiObject` that represents the first element matched. If element is specified, the selector will only search for children of the element (including itself).

`domsi.findAll(domsiSelector, [element])`
Identical to `domsi.find`, except it returns all elements matched.

Under the hood, `domsi.find` calls `domsi.findAll` and returns the first element.

## DomsiObject

All matches returned by `domsi.find` and `domsi.findAll` are `DomsiObject`s. They take on the following structure:

```typescript
{
    node: HTMLNode;
    children: {
        [name: string]: DomsiObject | DomsiObject[];
    };
}
```

Documentation on the children returned can be found in [DomsiChildrenSelector](./selector-docs.md#domsichildrenselector).
