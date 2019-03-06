const { QSBuilder } = require('../dist');

const qs = new QSBuilder();

qs.limit(10)
  .skip(10)
  .sort('field', -1);
qs.prop('value')
  .gt(1)
  .lt(10);
qs.prop('otherValue').in(1, 2, 3, 4, 5);
qs.prop('tags').in('a', 'b', 'c', 1, 2, 3);
qs.prop('name').nin('a', 'b', 'c');
qs.prop('id').regex(/^test/);

console.log(qs.toString());
