var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var path=require('path')
var da1=require('./mongoos.js')
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/dalist',function(req,res){
   da1.find({},function(err,data){
       res.json(data)                           
})

})
app.get('/summ',function(reg,res){
	 da1.aggregate([{$group : {_id : "$address", num_tutorial : {$sum: "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/minim',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$min : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('max',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$max : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/avg',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$avg : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/first',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$first : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/last',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$last : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/push',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$push : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/addToSet',function(reg,res){
	da1.aggregate([{$group : {_id : "$address", num_tutorial : {$addToSet : "$dob"}}}],
		function(err,data){
		res.json(data);
	});
})
app.get('/skipp',function(reg,res){
	da1.find({},null,{'address':1,skip:2},function(err,data){
		res.json(data);
	});
	
})

app.get('/limtt',function(reg,res){
	da1.find({},null,{'name':1,limit:2},function(err,data){
		res.json(data);
	});
	
})
app.get('/ascen',function(reg,res){
	da1.find({},null,{sort:{'name':-1}},function(err,data){
		res.json(data);
	});
	
})
app.post('/newcreate',function(reg,res){
	var a = new da1({"address":reg.body.address,"dob":reg.body.dob,"com":reg.body.com})
	a.save(function(err,data){
		res.json(data);
	});
	
})
 app.use('/routing', express.static(path.join(__dirname, 'routing')))
app.listen(3000)
