import IOpts from "../interfaces/IOpts"

const executeCode = async (code: string, browserInstance: any, opts: IOpts) => {

  const pages = await browserInstance?.pages()
  const page = pages[Number(opts.pageIndex)]
  const func = new Function(opts.pageName, opts.browserName, `
    return (async () => {
      try {
        ${code}
      }catch(err){
        console.log(err)
      }
    })();
  `)

  await func(page, browserInstance)
}

export default executeCode