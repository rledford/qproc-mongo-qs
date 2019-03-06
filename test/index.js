const { QSBuilder } = require('../dist');

const qs = new QSBuilder();

qs.limit(100)
  .skip(0)
  .sort('timestamp', -1);

qs.prop('word').in('one', 'two', 'three');
qs.prop('value')
  .gt(10)
  .lte(20);
qs.prop('nested.status').ne('active');

console.log(qs.toString());
