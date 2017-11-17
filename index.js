var express = require("express");   
const MongoClient    = require('mongodb').MongoClient;


var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();


// создаем приложение
var app = express();                
//var url = "mongodb://localhost:27017/dbtest";
var url = "mongodb://piter:petro123@ds141454.mlab.com:41454/firstdb1";
app.use(express.static(__dirname + "/public/Build html documentation/"));


var addRes = function(request, response){
console.log("aaaa");
var numQuest = request.body.num;
var res = request.body.ansvers;
console.log(res);
    MongoClient.connect(url, function(err, db){
       
 db.collection("test").findOneAndUpdate({num: numQuest}, {$set:{a2:res}}, {returnOriginal:false}, function(err, quest){
             
            if(err) return response.status(400).send();
            console.log(quest); 
            db.close();
response.send(quest.value);

});
});
}






app.post("/api/res",jsonParser,addRes);


app.get("/api/cntQw/", function (request, response) {
     

    MongoClient.connect(url, function(err, db){
       
    db.collection("test").count({}, function(err, n){
             
            if(err) return response.status(400).send();
        
            db.close();
  

    response.send(String(n));
  });

});

});


app.get("/api/getResult/", function (request, response) {
     

    MongoClient.connect(url, function(err, db){
       

 db.collection("test").find({}).toArray(function(err, quest){
             
            if(err) return response.status(400).send();
             
            db.close();
  

    response.send(quest);
 


});

 });



});






app.get("/api/answer/:num", function (request, response) {
    console.log(request.params.num); 
var questionNum = parseInt(request.params.num);
    MongoClient.connect(url, function(err, db){
       

 db.collection("test").findOne({num: questionNum}, function(err, quest){
             
            if(err) return response.status(400).send();
          
            db.close();
  

    response.send(quest);
  });

});

});

app.listen(5000);