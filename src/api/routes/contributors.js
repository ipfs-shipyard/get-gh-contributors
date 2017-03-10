const resources = require('./../resources')
const Joi = require('joi')

module.exports = (server, dataPath) => {
  const handlers = resources.contributors(dataPath)

  server.route({
    method: 'GET',
    path: '/contributors',
    config: {
      handler: handlers.contributors.get,
      validate: {
        query: {
          photo: Joi.string(),
          url: Joi.string(),
          username: Joi.string(),
          org: Joi.string(),
          limit: Joi.number(),
          page: Joi.number()
        }
      }
    }
  })
}
