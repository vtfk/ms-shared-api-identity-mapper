const { send } = require('micro')
const mongo = require('../lib/mongo')
const withTokenAuth = require('../lib/token-auth')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromUpn(request, response, upn) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['get-identities-from-upn', 'getIdentitiesFromUpn', upn, 'start'])
  try {
    const document = await identities.findOne({ upn: upn })
    const status = document !== null ? 200 : 404
    logger('info', ['get-identities-from-upn', 'getIdentitiesFromUpn', upn, status])
    send(response, status, fixDocument(document))
  } catch (error) {
    logger('error', ['get-identities-from-upn', 'getIdentitiesFromUpn', upn, error])
    send(response, 500, error)
  }
}

module.exports = async (request, response) => withTokenAuth(request, response, getIdentitiesFromUpn)
