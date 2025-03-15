**Scrap hot reloading**


### How to use?
- Install package
```
  npm install shr
```
- Call shrConfig function in the file where you are working and pass the root dir in your project (e.g., "./src") and all the variables you will need
e.g.:
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
await page.click('div.elementor-menu-toggle')

//@end-work-block
```