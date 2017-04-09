const test = require('tap').test
const gitQuery = require('../')

test('The readme changed since the commit that updated the readme', (t) => {
  gitQuery.didPathChangeSinceCommit('fc6a97e', '../*.md', (err, changed) => {
    t.error(err)
    t.equal(true, changed)
    t.end()
  })
})
