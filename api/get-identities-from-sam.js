const mongo = require('../lib/mongo')
const withParams = require('../lib/retrieve-params')
const fixDocument = require('../lib/fix-document')
const logger = require('../lib/logger')

async function getIdentitiesFromSam (request, response, params) {
  const db = await mongo()
  const identities = db.collection(process.env.MONGODB_COLLECTION)
  const { id: sam, old, sams, origin } = params
  const key = `sam${old ? 'Old' : ''}`
  logger('info', ['get-identities-from-sam', 'getIdentitiesFromSam', key, `${sams ? sams.join(', ') : sam}`, 'origin', origin, 'start'])
  if (!key && !sams) {
    const error = new Error('Missing required input')
    logger('error', ['api', 'get-identities-from-sam', 'getIdentitiesFromSam', `${sams ? sams.join(', ') : sam}`, 'origin', origin, error])
    response.status(400)
    response.send(error)
  } else {
    try {
      const document = sams ? await identities.find({ [key]: { $in: sams }, origin: origin }) : await identities.findOne({ [key]: sam, origin: origin })
      const status = document !== null ? 200 : 404
      logger('info', ['get-identities-from-sam', 'getIdentitiesFromSam', key, `${sams ? sams.join(', ') : sam}`, 'origin', origin, status])
      response.json(fixDocument(document))
    } catch (error) {
      logger('error', ['get-identities-from-sam', 'getIdentitiesFromSam', key, `${sams ? sams.join(', ') : sam}`, 'origin', origin, error])
      response.status(500)
      response.send(error)
    }
  }
}

module.exports = async (request, response) => withParams(request, response, getIdentitiesFromSam)
