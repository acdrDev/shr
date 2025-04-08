import { spawn } from "child_process"
import watcher from "./monitor/watcher"
import path from "path"

export const shrConfig = async (browserInstance: any) => {
  await watcher(browserInstance)
}