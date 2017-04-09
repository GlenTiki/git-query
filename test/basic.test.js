const test = require('tap').test
const gitQuery = require('../')

test('The readme changed since the commit that updated the readme', (t) => {
  gitQuery.didPathChangeSinceCommit('267775ba3b6813303fad3eb307d436d812783568', '../*.md', (err, changed) => {
    t.error(err)
    t.equal(true, changed)
    t.end()
  })
})

test('The file that should never change has never changed', (t) => {
  gitQuery.didPathChangeSinceCommit('038c8d01bc1d6c18db25dc5956b3516ef2a79fad', './DO_NOT_MODIFY', (err, changed) => {
    t.error(err)
    t.equal(false, changed)
    t.end()
  })
})
