# Git-Query

A tool for doing simple useful queries in a git repository.

## API

```didPathChangeSinceCommit(commit, path, callback)```

Does a diff against a commit sha to see if a path has been affected since that commit.

Takes the following parameters:

- `commit`: A git commit sha to do a diff against.
- `path`: The path you want to check has changed - any valid glob should work.
- `callback`: The function to be called with the result

Callback has the following signature:

```
function callback (error, result)
```

where `error` is an error object if something bad occurred, and `result` is a Boolean that says if the path has been affected since a commit.

## LICENSE

[MIT](./LICENSE)
