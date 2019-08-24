const mongo = require('../lib/mongo')
const withParams = require('../lib/retrieve-params')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromUpn (request, response, params) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  const { id: upn, old } = params
  const key = `upn${old ? 'Old' : ''}`
  logger('info', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, upn, 'start'])
  try {
    const document = await identities.findOne({ [key]: upn })
    const status = document !== null ? 200 : 404
    logger('info', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, upn, status])
    response.json(fixDocument(document))
  } catch (error) {
    logger('error', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, upn, error])
    response.status(500)
    response.send(error)
  }
}

module.exports = async (request, response) => withParams(request, response, getIdentitiesFromUpn)
