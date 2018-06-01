var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var daSchema = mongoose.Schema({
  address: {type:String},
  dob: Number,  
  com: {type:String}
});


var mycol = mongoose.model('mycol', daSchema,'mycollection');

module.exports=mycol;
