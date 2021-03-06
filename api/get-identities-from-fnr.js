const mongo = require('../lib/mongo')
const withParams = require('../lib/retrieve-params')
const anonymize = require('../lib/anonymize-fnr')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromFnr (request, response, params) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  const { id: fnr, fnrs, origin } = params
  logger('info', ['api', 'get-identities-from-upn', 'getIdentitiesFromFnr', anonymize(fnrs || fnr), 'origin', origin, 'start'])
  if (!fnr && !fnrs) {
    const error = new Error('Missing required input')
    logger('error', ['api', 'get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnrs || fnr), 'origin', origin, error])
    response.status(400)
    response.send(error)
  } else {
    try {
      const document = fnrs ? await identities.find({ fnr: { $in: fnrs }, origin: origin }).toArray() : await identities.findOne({ fnr: fnr, origin: origin })
      const status = document !== null ? 200 : 404
      logger('info', ['api', 'get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnrs || fnr), 'origin', origin, status])
      response.json(fixDocument(document))
    } catch (error) {
      logger('error', ['api', 'get-identities-from-fnr', 'getIdentitiesFromFnr', anonymize(fnrs || fnr), 'origin', origin, error])
      response.status(500)
      response.send(error)
    }
  }
}

module.exports = async (request, response) => withParams(request, response, getIdentitiesFromFnr)
