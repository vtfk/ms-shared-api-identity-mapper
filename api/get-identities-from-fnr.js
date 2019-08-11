const mongo = require('../lib/mongo')
const withTokenAuth = require('../lib/token-auth')
const anonymize = require('../lib/anonymize-fnr')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromFnr (request, response, params) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  const { id: fnr } = params
  logger('info', ['api', 'get-identities-from-upn', 'getIdentitiesFromFnr', anonymize(fnr), 'start'])
  try {
    const document = await identities.findOne({ fnr: fnr })
    const status = document !== null ? 200 : 404
    logger('info', ['api', 'get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnr), status])
    response.json(fixDocument(document))
  } catch (error) {
    logger('error', ['api', 'get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnr), error])
    response.status(500)
    response.send(error)
  }
}

module.exports = async (request, response) => withTokenAuth(request, response, getIdentitiesFromFnr)
