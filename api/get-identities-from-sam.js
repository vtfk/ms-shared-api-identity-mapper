const mongo = require('../lib/mongo')
const withParams = require('../lib/retrieve-params')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromSam (request, response, params) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  const { id: sam, old } = params
  const key = `sam${old ? 'Old' : ''}`
  logger('info', ['get-identities-from-sam', 'getIdentitiesFromSam', key, sam, 'start'])
  try {
    const document = await identities.findOne({ [key]: sam })
    const status = document !== null ? 200 : 404
    logger('info', ['get-identities-from-sam', 'getIdentitiesFromSam', key, sam, status])
    response.json(fixDocument(document))
  } catch (error) {
    logger('error', ['get-identities-from-sam', 'getIdentitiesFromSam', key, sam, error])
    response.status(500)
    response.send(error)
  }
}

module.exports = async (request, response) => withParams(request, response, getIdentitiesFromSam)
