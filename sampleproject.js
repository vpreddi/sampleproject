var express = require('express');
var app = express();
var url  = require('url');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'info'
});

var indexName = "randomindex";
var indextype = "messages";


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


client.on('error', function (err) {
console.log('Error ' + err);
});


app.get('/index', function (req, res) {

var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
client.get(query, function(err, value) {
if (err) throw err;
console.log('Got: ' + value);
});
   
})



app.post('/index', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
     client.set('message', query, redis.print);
elasticclient.index

index: indexName,
  type: indextype,

  body: {
    user: 'me',
    post_date: new Date(),
    message: query
  },
  refresh: true
});

})


app.get('/search', function (req, res) {

elasticclient.search({
  index: indexname,
  type:indextype,
  body: {
    message : query }
        }
    
  }
})
   
})