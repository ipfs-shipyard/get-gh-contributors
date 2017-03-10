module.exports = (server, dataPath) => {
  require('./contributors')(server, dataPath)
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: (request, reply) => reply('OHAI!')
    }
  })
}
