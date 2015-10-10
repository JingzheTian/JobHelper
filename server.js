var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('joblist',['joblist','userlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.post('/jobList', function(req, res){
    //console.log(req.body);
    db.joblist.insert(req.body, function(err,doc){
        res.json(doc);   
    })
});

app.post('/userlist', function(req, res){
    console.log(req.body);
    db.userlist.insert(req.body, function(err,doc){
        res.json(doc);   
    })
});

app.delete('/joblist/:id',function(req, res){
    var id =  req.params.id;
    //console.log(id);
    db.joblist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
         res.json(doc);   
    })
});

app.get('/joblist/:username',function(req, res){
    var username = req.params.username;
    console.log(username);
    db.joblist.find({username : username}, function(err, doc){
        res.json(doc);
    })
});

app.put('/joblist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.cname);
    db.joblist.findAndModify(
               {query :{_id : mongojs.ObjectId(id)},
                update:{$set:{cname: req.body.cname, cposition : req.body.cposition, cdate : req.body.cdate}},
                new: true},function(err, doc){
                    res.json(doc);
                })
    });

app.listen(3000);
console.log("Server running on port 3000");