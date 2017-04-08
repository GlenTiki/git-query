# Git-Query

A tool for doing simple useful queries in a git repository

## API

```didPathChangeSinceCommit(commit, path)```

Does a diff against a commit sha to see if a path has been affected since that commit.

Takes the following parameters:

- `commit`: A git commit sha to do a diff against.
- `path`: The path you want to check has changed - any valid glob should work.

Returns a `Boolean`.
  `true` if the path has been affected since a commit.
  `false` if not.

## LICENSE

[MIT](./LICENSE)
