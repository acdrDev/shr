**Scrap hot reloading**


### How to use?
Install package
```
  npm install @acdrdev/shr
```
Call the shrConfig function just below where you raise the browser instance and pass it as a parameter in the function, e.g.:
```javascript
  import puppeteer from "puppeteer";
  import { shrConfig } from "@acdrdev/shr";

  const browser = await puppeteer.launch({
    headless: false
  })
  await shrConfig(browser)
```
Now just run the scrapper and use the following comments to re-run the parts of the scrapper you need:

| Comment | Actions                        |
| ------- | ------------------------------ |
| //-->   | To execute the following line. |
| //<--   | To execute the previous line.  |

You can use both comments together to indicate code blocks, e.g.:
```javascript
  import puppeteer from "puppeteer";
  import { shrConfig } from "@acdrdev/shr";

  const browser = await puppeteer.launch({
    headless: false
  })
  await shrConfig(browser)

  const pages = await browser.pages()
  const page = pages[0] || await browser.newPage()
  await page.goto('https://aratiendas.com/', {
    waitUntil: 'domcontentloaded'
  })

  //-->

  await page.select('div[data-id="976483c"] select', "centro-Bogota")
  const pageSource = await page.content()

  //<--
```
By default to work the browser instance variable is called “browser”, the page instance variable is called “page” and it will execute the code in the tab with index 0, but these values can be modified in the same comments as follows:
```javascript
  //--> browserName: browserInstance, pageName: context, pageIndex: 1
  await context.select('div[data-id="976483c"] select', "centro-Bogota")
  const pageSource = await context.content()
  //<--
```
With the previous code we indicate that when we call the variable “browserInstance” we are referring to the browser instance, when we call the variable “context” we are referring to the instance of the page and that it will work in the tab with index 1 (the second tab), this properties can be indicated in any of the two comments and it does not matter their order, e.g.:
```javascript
  //--> browserName: browserInstance, pageName: context, pageIndex: 1
```
or
```javascript
  //<-- pageName: context, browserName: browserInstance, pageIndex: 1
```