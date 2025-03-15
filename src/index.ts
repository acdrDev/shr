import fs from "fs"
import { watch } from "chokidar"

export async function shrConfig(rootDir: string, args: Record<string, any>){
  try {
    watch(rootDir).on("change", (path) => {
      const content = fs.readFileSync(path, "utf-8")
      const code = content.slice(content.indexOf('//@start-work-block'), content.indexOf('//@end-work-block'))
      console.log(code)
      let argNames: string[] = []
      let argValues: any[] = []
      for(const [name, value] of Object.entries(args)){
        argNames.push(name)
        argValues.push(value)
      }
      const func = new Function(...argNames, `
        return (async () => {
          try {
            ${code}
          }catch(err){
            console.log(err)
          }
        })();
      `)
      func(...argValues)
    })
  } catch (error) {
    console.error('Watcher error ---> ', error)
  }
}