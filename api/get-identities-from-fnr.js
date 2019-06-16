const { send } = require('micro')
const mongo = require('../lib/mongo')
const withTokenAuth = require('../lib/token-auth')
const anonymize = require('../lib/anonymize-fnr')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromFnr (request, response, fnr) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['get-identities-from-upn', 'getIdentitiesFromFnr', anonymize(fnr), 'start'])
  try {
    const document = await identities.findOne({ fnr: fnr })
    const status = document !== null ? 200 : 404
    logger('info', ['get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnr), status])
    send(response, status, fixDocument(document))
  } catch (error) {
    logger('error', ['get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnr), error])
    send(response, 500, error)
  }
}

module.exports = async (request, response) => withTokenAuth(request, response, getIdentitiesFromFnr)
