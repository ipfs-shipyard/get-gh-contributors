'use strict'

const Hapi = require('hapi')
const debug = require('debug')
const log = debug('api')
log.error = debug('api:error')

exports = module.exports

let server

exports.start = (dataPath, callback) => {
  server = new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    }
  })

  server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: (Number(process.env.PORT)) || 9090
  })

  // load routes
  require('./routes')(server, dataPath)

  server.start((err) => callback(err, server.info))
}

exports.stop = (callback) => server.stop(callback)
