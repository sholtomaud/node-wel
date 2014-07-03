var fs = require('fs');
var parse = require('csv-parse');
var csv = require('csv');
var transform = require('stream-transform');


//Converter Class
var Converter=require("csvtojson").core.Converter;

var csvFileName="./wel.csv";
var readStream = fs.createReadStream(csvFileName);
var writeStream = fs.createWriteStream("outpuData.json");

//new converter instance
var param={
    "delimiter" : ",",
    "trim" : true
};
var csvConverter=new Converter(param);

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
   console.log(jsonObj); //here is your result json object
});

//read from file
readStream.pipe(csvConverter).pipe(writeStream);







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


.transform( function(row){
  //row.unshift(row.pop());
  return row;
})


csv()
.from.stream(fs.createReadStream(__dirname+'/wel.csv'),{
     columns: false
})
.transform( function(data){
    console.log(data);
    
    return data;
})
.to.path(__dirname+'/sample.out')
.on('record', function(row,index){
  console.log('#'+index+' '+JSON.stringify(row));
})
.on('end', function(count){
  console.log('Number of lines: '+count);
})
.on('error', function(error){
  console.log(error.message);
});
*/