const githubRepos = require('github-repositories')
const fs = require('fs')
const Promise = require('bluebird')
const writeFile = Promise.promisify(fs.writeFile)
const mkdir = Promise.promisify(require('mkdirp'))
const _ = require('lodash')
const Octokat = require('octokat')
const gh = new Octokat({
  token: token || process.env.GITHUB_OGN_TOKEN
})

const orgs = ['ipfs', 'ipld', 'libp2p', 'multiformats', 'orbitdb']

getAllOrgs(orgs, token)

function reduceData (data) {
  return _.reduce(data, function (result, value, key) {
    if (_.find(result, {login: value.login})) {
      _.find(result, {login: value.login}).contributions += value.contributions
      return result
    } else {
      result.push(value)
      return result
    }
  }, [])
}

function saveResponses (org, token) {
  return mkdir(`./data/${org}`)
    .then(() => githubRepos(org, {token: token}))
    .then((data) => _.map(data, _.property('name')))
    .then((response) => {
      Promise.map(response, (repo) => {
        return collect(
          gh.repos(`${org}/${repo}`).contributors.fetch(),
          org,
          repo
        ).then((data) => {
          console.log('wrote %s', repo)
          return data
        })
      })
      .map((data) => data.items)
      .then((data) => _.flatten(data))
      .then((data) => reduceData(data))
      .then((data) => {
        return collect(
          data,
          org
        )
        .then((data) => {
          console.log('wrote org %s', org)
          return data
        })
      })
      .then((data) => _.flatten(data))
      .then((data) => reduceData(data))
      .then((data) => {
        return collect(
          data,
          'protocol_labs'
        )
        .then((data) => {
          console.log('wrote protocol_labs')
          return data
        })
      })
    }).catch((err) => {
      console.log(err)
    })
}

function collect (val, org, repo) {
  return Promise.resolve(val)
    .then((res) => {
      writeFile(
        (repo) ? `./data/${org}/${repo}.json` : `./data/${org}.json`,
        JSON.stringify(res, null, 2)
      )
      return val
    })
    .catch((err) => {
      console.log(err)
    })
}

function getAllOrgs (orgs, token) {
  orgs.forEach((org) => saveResponses(org, token))
}
