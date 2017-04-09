const nodegit = require('nodegit')
const stackTrace = require('stack-trace')
const walkup = require('walk-up')
const minimatch = require('minimatch')
const path = require('path')

function didPathChangeSinceCommit (oid, searchPath, cb) {
  const callerFile = stackTrace.get()[0].getFileName()
  const absolutePath = path.resolve(callerFile, searchPath)

  walkup(callerFile, '.git', (err, repoResult) => {
    if (err) return cb(err)
    if (!repoResult.found) return cb(new Error('cant find a git repo'))

    nodegit.Repository.open(repoResult.path)
      .then(repo => Promise.all([repo.getCommit(oid), repo.getHeadCommit()]))
      .then(commits => Promise.all(commits.map(commit => commit.getTree())))
      .then(trees => trees[0].diff(trees[1]))
      .then(diff => diff.patches())
      .then(patches => patches.map(patch => {
        const oldPath = path.join(repoResult.path, patch.oldFile().path())
        const newPath = path.join(repoResult.path, patch.newFile().path())
        return {oldPath, newPath}
      }))
      .then((paths) => {
        const matched = paths.map(path => path.newPath).filter(minimatch.filter(absolutePath, {matchBase: true}))
        return cb(null, Boolean(matched.length))
      })
      .catch(cb)
  })
}

module.exports = {
  didPathChangeSinceCommit
}
