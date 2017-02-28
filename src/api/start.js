const api = require('./index.js')
const path = require('path')

const dataPath = path.join(__dirname, '../../data')

api.start(dataPath, (err, info) => {
  if (err) {
    return console.log(err)
  }
  console.log('API has started', info.uri)
})
