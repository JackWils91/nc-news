## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/articles`

Assertion: expected { Object (article) } to contain key 'articles'

Hints:

- send articles to the client in an object, with a key of articles: `{ articles: [] }`

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- the default sort should be by `created_at` and the default order should be `desc`

**this might be fixed by the above**

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- add a `comment_count` property to each article
- join to the `comments` table, as this information lives there
- use an aggregate `COUNT` function
- use `GROUP BY` to avoid duplicate rows

**this might be fixed by the above**

### GET `/api/articles?sort_by=author`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article

**this might be fixed by the above**

### GET `/api/articles?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`

**this might be fixed by the above**

### GET `/api/articles?author=butter_bridge`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `author` query of any author that exists in the database
- use `where` in the model

**this might be fixed by the above**

### GET `/api/articles?topic=mitch`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model

**this might be fixed by the above**

### GET `/api/articles?topic=not-a-topic`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists

### GET `/api/articles?author=not-an-author`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists

### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### PATCH `/api/articles/1`

Assertion: expected 101 to equal 100

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/1/comments`

Assertion: expected undefined to be an array

Hints:

- send comments in an array, with a key of `comments`

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- use the data from the `test-data` in your tests

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- sort comments by `created_at` by default
- order should default to `DESC`

**this might be fixed by the above**

### GET `/api/articles/1/comments?sort_by=votes`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query of any valid column
- order should default to `DESC`

**this might be fixed by the above**

### GET `/api/articles/1/comments?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`
- `sort_by` should default to `created_at`

**this might be fixed by the above**

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

error: column "not-a-valid-column" does not exist
at Connection.parseE (/Users/paulrogerson/nc/reviews/BEN-reviews/TEAM-BEND-review-runner/evaluations/jack-w/node_modules/pg/lib/connection.js:602:11)
at Connection.parseMessage (/Users/paulrogerson/nc/reviews/BEN-reviews/TEAM-BEND-review-runner/evaluations/jack-w/node_modules/pg/lib/connection.js:399:19)
at Socket.<anonymous> (/Users/paulrogerson/nc/reviews/BEN-reviews/TEAM-BEND-review-runner/evaluations/jack-w/node_modules/pg/lib/connection.js:121:22)
at Socket.emit (events.js:196:13)
at addChunk (\_stream_readable.js:290:12)
at readableAddChunk (\_stream_readable.js:271:11)
at Socket.Readable.push (\_stream_readable.js:226:10)
at TCP.onStreamRead (internal/stream_base_commons.js:166:17) {
name: 'error',
length: 118,
severity: 'ERROR',
code: '42703',
detail: undefined,
hint: undefined,
position: '59',
internalPosition: undefined,
internalQuery: undefined,
where: undefined,
schema: undefined,
table: undefined,
column: undefined,
dataType: undefined,
constraint: undefined,
file: 'parse_relation.c',
line: '3294',
routine: 'errorMissingColumn'
}

### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### PATCH `/api/comments/1`

Assertion: expected 17 to equal 16

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
