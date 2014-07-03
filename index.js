var fs = require('fs');
var parse = require('csv-parse');
var csv = require('csv');
var transform = require('stream-transform');

/*
var output = [];
var parser = parse({delimiter: ','})
var input = fs.createReadStream(__dirname + '/wel.csv');
var transformer = transform(function(record, callback){
  record.join(' ')+'\n';
  console.log(record);
}, {parallel: 10});

input.pipe(parser).pipe(transformer).pipe(process.stdout);

csv()
.from.string(
  '#Welcome\n"1","2","3","4"\n"a","b","c","d"',
  {comment: '#'} )
.to.array( function(data){
  console.log(data)
} );
*/
csv()
.from.stream(fs.createReadStream(__dirname+'/wel.csv'))
.to.path(__dirname+'/sample.out')
.transform( function(row){
  row.unshift(row.pop());
  return row;
})
.on('record', function(row,index){
  console.log('#'+index+' '+JSON.stringify(row));
})
.on('end', function(count){
  console.log('Number of lines: '+count);
})
.on('error', function(error){
  console.log(error.message);
});