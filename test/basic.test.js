const test = require('tap').test
const gitQuery = require('../')

test('The readme changed since the commit that updated the readme', (t) => {
  gitQuery.didPathChangeSinceCommit('267775ba3b6813303fad3eb307d436d812783568', '../*.md', (err, changed) => {
    t.error(err)
    t.equal(true, changed)
    t.end()
  })
})
