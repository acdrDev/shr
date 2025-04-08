import IOpts from "../interfaces/IOpts"

const extractCode = (fileContent: string): { code: string, opts: IOpts } => {
  const splitContent = fileContent.split("\n")
  const startCode = splitContent.findIndex((value) => value.includes('//-->'))
  const endCode = splitContent.findIndex((value) => value.includes('//<--'))
  let opts: IOpts = {
    pageIndex: "0",
    pageName: 'page',
    browserName: "browser"
  }

  if(endCode == -1 && startCode != -1){
    const opts = getOpt(splitContent[startCode])
    return { code: splitContent[startCode + 1], opts }
  }

  if(endCode != -1 && startCode == -1){
    let opts = getOpt(splitContent[endCode])
    return { code: splitContent[endCode - 1], opts }
  }

  if(endCode != -1 && startCode != -1){
    let opts = getOpt(splitContent[startCode])
    opts = getOpt(splitContent[endCode], opts)
    const code = splitContent.slice(startCode, endCode).join("\n")
    return { code, opts }
  }

  return { code: "", opts}
}

const getOpt = (stringOpts: string, defaultOpts?: IOpts): IOpts => {
  let opts: IOpts = {
    pageIndex: "0",
    pageName: 'page',
    browserName: "browser"
  }

  if(defaultOpts){
    opts = defaultOpts
  }
  
  const splitOpts = stringOpts.replace('//-->', '').trim().split(',')

  splitOpts.forEach((opt) => {
    let value = opt.split(':')
    opts[value[0].trim()] = value[1].trim()
  })

  return opts
}

export default extractCode