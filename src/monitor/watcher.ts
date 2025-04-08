import fs from "fs"
import { watch } from "chokidar"
import path from "path"
import executeCode from "../lib/executeCode"
import extractCode from "../lib/extractCode"

const watcher = async (browserInstance: any) => {
  try {
    const dir = path.resolve(".")
    console.log(dir)
    watch(dir).on("change", async (path) => {
      console.log(path)
      const content = fs.readFileSync(path, "utf-8")
      const { code, opts } = extractCode(content)

      if(code != "") await executeCode(code, browserInstance, opts) 
      
    })
  } catch (error) {
    console.error('Watcher error ---> ', error)
  }
}

export default watcher