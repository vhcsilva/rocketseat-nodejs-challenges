import http from 'node:http'
import { Logger } from './logger.js'

export class App {
  #server = null
  #routes = []
  #middlewares = []

  constructor() {
    this.#server = http.createServer(async (req, res) => {
      const { method, url } = req
      const route = this.#routes.find(route => route.method === method && route.path === url)
      if (!route)
        return res.writeHead(404).end()
      for (const middleware of this.#middlewares) {
        await middleware(req, res)
      }
      return route.handler(req, res)
    })
  }

  use(fn) {
    this.#middlewares.push(fn)
  }

  get(path, handler) {
    this.#routes.push({
      method: 'GET',
      path,
      handler,
    })
  }

  post(path, handler) {
    this.#routes.push({
      method: 'POST',
      path,
      handler,
    })
  }

  put(path, handler) {
    this.#routes.push({
      method: 'PUT',
      path,
      handler,
    })
  }

  patch(path, handler) {
    this.#routes.push({
      method: 'PATCH',
      path,
      handler,
    })
  }

  delete(path, handler) {
    this.#routes.push({
      method: 'DELETE',
      path,
      handler,
    })
  }

  listen(port) {
    if (!port || port < 1)
      throw new Error("Invalid port")
    this.#server.listen(3333)
    Logger.log(`Server listening on port ${port}`)
  }
}