const Mongo = require("./mongo");
const moment = require('moment');
var csv = require("fast-csv");
// 2018-06-05 20:24:19
const dateFormat = "YYYY-MM-DD HH:mm:ss"
mongo = new Mongo();
csv
 .fromPath("/home/adamrunner/temp-graph_production-20180607.csv")
 .on("data", function(data){
   mongo.createEntry({
     hostname:   data[2],
     temp:       parseFloat(data[1]),
     created_at: moment.utc(data[0], dateFormat).toDate()
   })
 })
 .on("end", function(){
     console.log("done");
 });