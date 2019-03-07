const { QSBuilder } = require('../dist');

const qs = new QSBuilder();

qs.limit(100)
  .skip(0)
  .sort('timestamp', -1);

qs.param('word').in('one', 'two', 'three');
qs.param('value')
  .gt(10)
  .lte(20);
qs.param('nested.status').ne('active');
qs.param('text').regex(/^[A-z0-9]/);

console.log(qs.toString());
