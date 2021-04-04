/**
 * get query params from URL(via default vue query object)
 * and pass it to component props
 */
export function routePropResolver(routeOptions) {
  const { query } = routeOptions
  const resultQuery = {}

  Object.keys(query).forEach(key => {
    // parse strings
    if (query[key].length && !['0', 'null', 'undefined', 'NaN'].includes(query[key])) {
      resultQuery[key] = query[key]
    }
    // parse numbers
    if (parseInt(query[key])) {
      resultQuery[key] = +query[key]
    }
  })
  return resultQuery
}