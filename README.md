**Scrap hot reloading**


### How to use?
- Install package
```
  npm install @acdrdev/shr
```
- Call shrConfig function in the file where you are working and pass the root dir in your project (e.g., "./src") and all the variables you will need, also use "//@star-work-block" and "//@end-work-block" to indicate the specific code block you are going to work with, e.g.:
```javascript
  import puppeteer from "puppeteer";
  import { shrConfig } from "shr";

  const browser = await puppeteer.launch({
    headless: false
  })

  const pages = await browser.pages()
  const page = pages[0] || await browser.newPage()
  await page.goto('https://aratiendas.com/', {
    waitUntil: 'domcontentloaded'
  })

  let sede = "/centro-Bogotá"

  await shrConfig(".", {page, sede})
  //@start-work-block

  await page.select('div[data-id="976483c"] select', sede)

  //@end-work-block
```