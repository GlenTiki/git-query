const nodegit = require('nodegit')
// const minimatch = require('minimatch')
const stackTrace = require('stack-trace')
const path = require('path')
const walkup = require('walk-up')

function didPathChangeSinceCommit (oid, searchPath, cb) {
  const callerFile = stackTrace.get()[0].getFileName()
  const absolutePath = path.resolve(callerFile, searchPath)

  walkup(callerFile, '.git', (err, result) => {
    if (err) return cb(err)
    if (!result.found) return cb(new Error('cant find a git repo'))

    nodegit.Repository.open(result.path)
      .then(repo => Promise.all([repo.getCommit(oid), repo.getHeadCommit()]))
      .then(commits => Promise.all(commits.map(commit => commit.getTree())))
      .then(trees => trees[0].diff(trees[1]))
      .then(diff => diff.patches())
      .then(patches => patches.map(patch => {
        console.log('diff', patch.oldFile().path(), patch.newFile().path())
      }))
      .then(() => {
        console.error('path', absolutePath)
        return cb(null, true)
      })
      .catch(cb)
  })
}

module.exports = {
  didPathChangeSinceCommit
}
