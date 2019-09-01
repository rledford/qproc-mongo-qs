# qproc-mongo-qs

Targets ES5+

Provides a query string builder class to create url encoded query strings that are compatible with [qproc-mongo](https://www.npmjs.com/package/qproc-mongo).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Keys](#keys)
- [Limit](#limit)
- [Skip](#skip)
- [Sort](#sort)
- [Search](#search)
- [Query Parameters](#query-parameters)

## Install

```bash
npm i -S qproc-mongo-qs
```

## Usage

```js
const { QSBuilder } = require("qproc-mongo-qs");
const qs = new QSBuilder();

qs.limit(100)
  .skip(0)
  .sort("timestamp", -1);

qs.prop("word").in("one", "two", "three");
qs.prop("value")
  .gt(10)
  .lte(20);
qs.prop("nested.status").ne("active");
qs.prop("text").regex(/^[A-z0-9]/);

console.log(qs.toString());

/*

limit=100&sort=desc:timestamp&word=in:one,two,three&value=gt:10,lte:20&nested.status=ne:active&text=regex:/%5E[A-z0-9]/

*/

const uri = `https://rest-api.com/api/items?${qs.toString()}`;
```

## Keys

The `limit`, `skip`, `sort`, and `search` keys should match the keys `qproc-mongo` is configured with. The defaults match the `qproc-mongo` defaults.

| Key    | Default  | Description                              | Example                 |
| ------ | -------- | ---------------------------------------- | ----------------------- |
| limit  | `limit`  | The maximum number of records to return. | `qs.limitKey('count')`  |
| skip   | `skip`   | The number of records to skip.           | `qs.skipKey('offset')`  |
| sort   | `sort`   | The sort property name(s) and order(s).  | `qs.sortKey('orderBy')` |
| search | `search` | The search term.                         | `qs.searchKey('q')`     |

### Example

```js
const { QSBuilder } = require("qproc-mongo-qs");

const qs = new QSBuilder();
qs.limitKey("count")
  .skipKey("offset")
  .sortKey("orderBy")
  .searchKey("q")
  .limit(10)
  .sort("value", 1);

qs.prop("value")
  .gt(1)
  .lte(10);

console.log(qs.toString());

/*

count=10&orderBy=asc:value&value=gt:1,lte:10

*/
```

## Limit

The `limit` method expects a positive `Number` argument and returns the `QSBuilder` so that calls are chainable.

## Skip

The `skip` method expects a positive `Number` argument and returns the `QSBuilder` so that calls are chainable.

## Sort

The `sort` method expects a `property name` and a numerical `direction` as arguments. It can be called multiple times with different `property name` values for complex sorts. Returns the `QSBuilder` so that calls are chainable.

| Direction | Sort Order | Example                    |
| --------- | ---------- | -------------------------- |
| `-1`      | Descending | `qs.sort('timestamp', -1)` |
| `1`       | Ascending  | `qs.sort('timestamp', 1)`  |

## Search

The `search` method expects a `String` or `Number`. As stated in the `qproc-mongo` documentation, when a search key is present in the query parameters, all other query parameters are ignored. See the [qproc-mongo documentation](https://www.npmjs.com/package/qproc-mongo#search) for more info. Returns the `QSBuilder` so that calls are chainable.

## Query Parameters

The `prop` method expects a `property name` argument and returns a `QSParam`. The `prop` exposes the following operator functions. The operator functions return the `QSParam` for chaining.

| Function | Argument Type        | Description                                                 | Example                     |
| -------- | -------------------- | ----------------------------------------------------------- | --------------------------- |
| eq       | `String` \| `Number` | Equal.                                                      | `prop('key').eq('value')`   |
| ne       | `String` \| `Number` | Not equal.                                                  | `prop('key').ne('value')`   |
| in       | `String` \| `Number` | In the list of values. Accepts any number of arguments.     | `prop('key').in(1,2,3,4)`   |
| nin      | `String` \| `Number` | Not in the list of values. Accepts any number of arguments. | `prop('key').nin(1,2,3,4)`  |
| gt       | `String` \| `Number` | Greater than.                                               | `prop('key').gt(1)`         |
| gte      | `String` \| `Number` | Greater than or equal to.                                   | `prop('key').gte(1)`        |
| lt       | `String` \| `Number` | Less than.                                                  | `prop('key').lt(1)`         |
| lte      | `String` \| `Number` | Less than or equal to.                                      | `prop('key').lte(1)`        |
| all      | `String` \| `Number` | Contains all values. Accepts any number of arguments.       | `prop('key').all(1,2,3,4)`  |
| regex    | `String` \| `RegExp` | Match regular expression.                                   | `prop('key').regex(/^A-z/)` |

Calling the same operator method on the same `prop` multiple times will overwrite the previous value.
