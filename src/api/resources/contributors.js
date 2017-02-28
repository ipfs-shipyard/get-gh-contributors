const boom = require('boom')

function readAndFilter (dataPath, org) {
  const data = require(dataPath + '/' + org + '.json')

  const filtered = data.map((user) => {
    return {
      url: user.htmlUrl,
      photo: user.avatarUrl,
      username: user.login
    }
  })

  return filtered
}

module.exports = (dataPath) => {
  const handlers = {}

  handlers.contributors = {}

  handlers.contributors.get = (request, reply) => {
    const orgs = ['ipfs', 'ipld', 'libp2p', 'multiformats', 'orbitdb']

    const options = {
      photo: !(request.query.photo === 'false'),
      url: !(request.query.url === 'false'),
      username: !(request.query.username === 'false'),
      org: request.query.org ? request.query.org : 'all'
    }

    if (options.org !== 'all' && orgs.indexOf(options.org) === -1) {
      reply(boom.notFound('org not available'))
      return
    }

    if (options.org === 'all') {
      reply(readAndFilter(dataPath, 'protocol_labs'))
    } else {
      reply(readAndFilter(dataPath, options.org))
    }
  }

  return handlers
}
