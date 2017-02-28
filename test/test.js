const test = require('tape')
const wreck = require('wreck')
const path = require('path')
const api = require('../src/api')

process.env.PORT = '10000'
let url = 'http://localhost:10000'

test('start the API', function (t) {
  const dataPath = path.join(__dirname, '/test-data')

  api.start(dataPath, function (err, info) {
    t.ifErr(err)
    t.end()
  })
})

test('check', function (t) {
  const org = 'ipld'
  wreck.get(url + '/insurance/quote?org=' + org, {
    json: true
  }, (err, res, payload) => {
    t.ifErr(err)
    t.end()
  })
})

test('stop the API', function (t) {
  api.stop(function (err) {
    t.ifErr(err)
    t.end()
  })
})
