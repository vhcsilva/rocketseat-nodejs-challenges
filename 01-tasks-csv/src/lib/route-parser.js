export class RouteParser {
  static getRegex(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    return pathRegex
  }

  static test(path, url) {
    return this.getRegex(path).test(url)
  }

  static extractRouteParams(path, url) {
    const { query, ...params } = url.match(this.getRegex(path)).groups
    const querySearchParams = new URLSearchParams(query || "")
    return { 
      query: Object.fromEntries(querySearchParams),
      params
    }
  }
}