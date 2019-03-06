# qproc-mongo-qs

Targets ES5+

Creates url encoded query strings that are compatible with qproc-mongo. Provides a flexible QSBuilder class with chainable functions.

## Table of Contents

- [Install](#install)
- [Usage](#usage)

## Install

```bash
npm i -S qproc-mongo-qs
```

## Usage

```js
const { QSBuilder } = require('qproc-mongo-qs');
const qs = new QSBuilder();

qs.limit(100)
  .skip(0)
  .sort('timestamp', -1);

qs.prop('word').in('one', 'two', 'three');
qs.prop('value')
  .gt(10)
  .lte(20);
qs.prop('nested.status').ne('active');

const qstring = qs.toString();

console.log(qstring);
/*
limit=100&sort=desc:timestamp&word=in:one,two,three&value=gt:10&value=lte:20&nested.status=ne:active
*/
```
