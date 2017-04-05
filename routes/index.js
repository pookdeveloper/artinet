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
router.get('/', function(req, res, next) {

   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);


    /*connection.connect();
    connection.query('SELECT * FROM artists', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ' + results[0].name);
    });
    connection.release;*/
    var resultado = "";
    var offset = 0;
    var limit = 50;
    var busqueda = "a";
    var correcto = true;
    var url = "https://api.spotify.com/v1/search?q="+busqueda+"&type=artist&limit="+limit+"&offset="+offset;
    var datos = "dddd";



        request(url, function (error, response, body, datos) {
          if (error != null){
            console.log('ERRORRRRRRRRRRRRR');
          }else{
            console.log(url);
            resultado = JSON.parse(body);

            for (var key in resultado.artists.items){
              var value =  resultado.artists.items[key];
              console.log(value.name);
              datos = value.name ;
            }
            offset = (offset + limit + 1);
            url = "https://api.spotify.com/v1/search?q="+busqueda+"&type=artist&limit="+limit+"&offset="+offset;
            console.log('--------------------------------------------------------------> ' + offset);
          /*  if (offset >= 0){
              correcto = false;
            }*/
          }


        });

          res.send(resultado);

    //res.render('index', { title: 'Express' });

});



/* GET home page. */
router.get('/1', function(req, res, next) {
  /*
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);


var data ="";

   /*
    connection.query('SELECT * FROM artists', function (error, results, fields) {
      if (error) throw error;
      data = data + results[0].name;
      console.log(  results[0].name);
    });
    */
    //connection.end();

    pool.query('SELECT * FROM artists', function (error, results, fields) {
      if (error) throw error;
      data = (results);

      res.json([{id:"12",data:"123556",details:{"name":"alan","age":"12"}}]);

      /*for (var i = 0; i < results.length; i++) {
      console.log(  results[i].name);
    }*/
//      console.log('The solution is: ', results[0].name);
    });
    //connection.release();

    //res.send('sss');
});


module.exports = router;
