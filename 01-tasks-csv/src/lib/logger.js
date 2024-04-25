import { ansiColors } from '../utils/ansi-colors.js'

export class Logger {
  static log(content) {
    console.log(`[LOG] ${new Date().toISOString()} ${content}`)
  }

  static info(content) {
    console.log(`${ansiColors.fg.cyan}[INFO] ${new Date().toISOString()} ${content}${ansiColors.reset}`)
  }

  static warning(content) {
    console.log(`${ansiColors.fg.yellow}[WARNING] ${new Date().toISOString()} ${content}${ansiColors.reset}`)
  }

  static success(content) {
    console.log(`${ansiColors.fg.green}[SUCCESS] ${new Date().toISOString()} ${content}${ansiColors.reset}`)
  }

  static error(content) {
    console.log(`${ansiColors.fg.red}[ERROR] ${new Date().toISOString()} ${content}${ansiColors.reset}`)
  }
}