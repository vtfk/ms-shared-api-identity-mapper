const mongo = require('../lib/mongo')
const withTokenAuth = require('../lib/token-auth')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromUpn (request, response, upn) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['get-identities-from-upn', 'getIdentitiesFromUpn', upn, 'start'])
  try {
    const document = await identities.findOne({ upn: upn })
    const status = document !== null ? 200 : 404
    logger('info', ['get-identities-from-upn', 'getIdentitiesFromUpn', upn, status])
    response.json(fixDocument(document))
  } catch (error) {
    logger('error', ['get-identities-from-upn', 'getIdentitiesFromUpn', upn, error])
    response.status(500)
    response.send(error)
  }
}

module.exports = async (request, response) => withTokenAuth(request, response, getIdentitiesFromUpn)
