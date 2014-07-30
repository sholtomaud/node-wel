"use strict";

var fs = require('fs'),
    parse = require('csv-parse'),
    csv = require('csv'),
    transform = require('stream-transform'),
    sprintf = require('sprintf').sprintf,
    vsprintf = require('sprintf').vsprintf,
    inquirer = require('inquirer'),
    Glob = require('glob').Glob;



/*
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
*/

console.log("Wel file processor");

var questions = [
  {
    type: "list",
    name: "inputFile",
    message: "What is your input file",
    filter: function( val ) { return val.toLowerCase(); }
  }
];

var csvPattern = "{./.csv}"

var csvFiles = new Glob(csvPattern,{mark:true},function(er,matches){
    console.log(matches);
    questions[1].choices = matches;
});

//console.log(csvFiles);

inquirer.prompt( questions, function( answers ) {
  console.log("\nOrder receipt:");
  console.log( JSON.stringify(answers, null, "  ") );

    csv()
    .from.stream(fs.createReadStream(__dirname+'/wel.csv'),{
         columns: false
    })
    .transform( function(data){
        //console.log(data);
        
        //  my $wellval = ( $components[1] < 0)? sprintf("%4.3f",$components[1]): $components[1];
        //  $output = sprintf("%10s%10s%10s%21s%-3s",$components[0],$wellval,$components[2]//"",$stressperiod,$period_number);  
        var wellval =  Number(data[1]);
        
        var d = sprintf('%10s%10.3f%10s%10s',data[0],wellval,data[2],data[3]) + '\n';
        return d;
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
  
});


