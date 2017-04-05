var express = require('express');
var router = express.Router();


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '212211dgs',  //212211dgs / admin
  database : 'artinet'
});

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '212211dgs',  //212211dgs / admin
  database : 'artinet'
});


var request = require('request');

connection.connect(function(err) {
	if (err) throw err

});



/* GET home page. */
router.get('/listado', function(req, res, next) {
  /*
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  var data ="";
  pool.query('SELECT * FROM festivals', function (error, results, fields) {
    if (error) throw error;
    data = (results);
    res.json(data);
  });
});


module.exports = router;
