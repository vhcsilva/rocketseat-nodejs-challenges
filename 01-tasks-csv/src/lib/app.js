import http from 'node:http'

export class App {
  #server = null
  #routes = []

  constructor() {
    this.#server = http.createServer(async (req, res) => {
      const { method, url } = req
      const route = this.#routes.find(route => route.method === method && route.path === url)
      if (!route)
        return res.writeHead(404).end()
      return route.handler(req, res)
    })
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
    console.log(`[SERVER] Server listening on port ${port}`)
  }
}