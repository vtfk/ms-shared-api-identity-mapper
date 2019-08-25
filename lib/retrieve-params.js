const withTokenAuth = require('./token-auth')
const logger = require('./logger')

module.exports = async (request, response, next) => {
  const pathlist = request.url.split('/')
  const old = pathlist.includes('old')
  const id = pathlist.pop()
  const data = await request.body
  const params = data ? Object.assign({}, data, { old, id }) : { old, id }
  if (process.env.NO_AUTH) {
    logger('info', ['lib', 'retrieve-params', 'no-auth'])
    return next(request, response, params)
  } else {
    return withTokenAuth(request, response, next(request, response, params))
  }
}
