const boom = require('boom')
const uniq = require('uniq')

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

function uniqueCompare (a, b) {
  if (a.username === b.username) {
    return 0
  } else {
    return -1
  }
}

function sortCompare (a, b) {
  if (a.username < b.username) {
    return -1
  }
  if (a.username > b.username) {
    return 1
  }
  return 0
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
      uniq(filtered.sort(sortCompare), uniqueCompare, true)
      // console.log('check total', filtered.length)
      reply(filtered)
    } else {
      if (page > filtered.length / limit) {
        return reply(boom.notFound('no page with that number'))
      }
      const offset = page * limit
      const slice = filtered.slice(offset, offset + 100)
      uniq(slice.sort(sortCompare), uniqueCompare, true)
      reply(slice)
    }
  }

  return handlers
}
