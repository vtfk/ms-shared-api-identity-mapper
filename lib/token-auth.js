const validateToken = require('./validate-token')
const logger = require('./logger')

module.exports = async (request, response, next) => {
  const pathlist = request.url.split('/')
  const id = pathlist.pop()
  const old = pathlist.includes('old')
  const data = await request.body
  const bearerToken = request.headers.authorization
  if (!bearerToken) {
    const msg = 'missing Authorization header'
    logger('warn', ['token-auth', msg])
    response.writeHead(401)
    response.end('missing Authorization header')
    return
  }
  try {
    const token = bearerToken.replace('Bearer ', '')
    const validatedToken = await validateToken(token)
    request.token = validatedToken
  } catch (error) {
    logger('error', ['token-auth', error])
    response.writeHead(401)
    response.end('invalid token in Authorization header')
    return
  }
  const params = data ? Object.assign({}, data, { old, id }) : { old, id }
  return next(request, response, params)
}
