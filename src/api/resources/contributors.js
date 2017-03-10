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
    const page = request.query.page >= 0
      ? request.query.page
      : -1

    const limit = 100

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

    let filtered

    if (options.org === 'all') {
      const users = orgs.map((org) => readAndFilter(dataPath, org))
      const flat = [].concat.apply([], users)
      filtered = flat
    } else {
      filtered = readAndFilter(dataPath, options.org)
    }

    if (page === -1) {
      reply(filtered)
    } else {
      if (page > filtered.length / limit) {
        return reply(boom.notFound('no page with that number'))
      }
      const offset = page * limit
      const slice = filtered.slice(offset, offset + 100)
      console.log(slice.length)
      reply(slice)
    }
  }

  return handlers
}
