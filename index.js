var express = require("express");
const MongoClient    = require('mongodb').MongoClient;


var app = express();
//app.use(express.logger());

var url = "mongodb://piter:petro123@ds141454.mlab.com:41454/firstdb1"


app.get('/', function(request, response) {
  
MongoClient.connect(url, function(err, db){
        db.collection("students").find({}).toArray(function(err, users){
            response.send(users)
            db.close();
            console.log(users);
        });
    });

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});