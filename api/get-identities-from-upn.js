const mongo = require('../lib/mongo')
const withParams = require('../lib/retrieve-params')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromUpn (request, response, params) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  const { id: upn, old, upns } = params
  const key = `upn${old ? 'Old' : ''}`
  logger('info', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, `${upns ? upns.join(', ') : upn}`, 'start'])
  if (!upn && !upns) {
    const error = new Error(`Missing required input`)
    logger('error', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, `${upns ? upns.join(', ') : upn}`, error])
    response.status(400)
    response.send(error)
  } else {
    try {
      const document = upns ? await identities.find({ [key]: { $in: upns } }).toArray() : await identities.findOne({ [key]: upn })
      const status = document !== null ? 200 : 404
      logger('info', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, `${upns ? upns.join(', ') : upn}`, status])
      response.json(fixDocument(document))
    } catch (error) {
      logger('error', ['api', 'get-identities-from-upn', 'getIdentitiesFromUpn', key, `${upns ? upns.join(', ') : upn}`, error])
      response.status(500)
      response.send(error)
    }
  }
}

module.exports = async (request, response) => withParams(request, response, getIdentitiesFromUpn)
