const withTokenAuth = require('./token-auth')
const logger = require('./logger')

module.exports = async (request, response, next) => {
  const pathlist = request.url.split('/')
  const old = pathlist.includes('old')
  const id = pathlist.pop().split('?')[0]
  const body = await request.body
  const query = await request.query
  const data = body || query ? { ...body, ...query } : false
  const origin = data.origin ? data.origin : process.env.DEFAULT_ORIGIN
  const params = data ? { ...data, old, id, origin } : { old, id, origin }
  if (process.env.NO_AUTH) {
    logger('info', ['lib', 'retrieve-params', 'no-auth'])
    return next(request, response, params)
  } else {
    return withTokenAuth(request, response, async () => next(request, response, params))
  }
}
