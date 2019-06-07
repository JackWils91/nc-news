## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/articles/1/comments`

Assertion: expected { Object (comment_id, author, ...) } to have keys 'comment_id', 'votes', 'created_at', 'author', and 'body'

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- use the data from the `test-data` in your tests

DON;T UNDERSTAND WHY THIS IS PUSHNG OUT AN ERROR - LINE 338

### PATCH `/api/comments/1` - 516

Assertion: expected 17 to equal 16

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
