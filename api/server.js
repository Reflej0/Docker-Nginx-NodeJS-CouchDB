var configuracion = require('./configuracionBack.js');
var fs = require('fs');
var express = require('express');
var nano = require('nano')(configuracion.DB_URL); // Connect to the CouchDB running on port 5984
var app = express();
var db_name = 'test'; // The name of the database to connect to
var db = nano.use(db_name);
//Esto es SUPER IMPORTANTE estuve como 2 horas, es para que cuando la aplicacion corra dentro del contenedor de Docker no tire problema con el CORS
var cors = require('cors');
app.use(cors());

function insertDoc(doc, tried){
	db.insert(doc, function(err, http_body, http_headers){
		if(err){
			if(err.message === 'no_db_file' && tried < 1){
				return nano.db.create(db_name,function(){
					insert_doc(doc, tried+1);
				});
			} else {
				return console.log(err);
			}
		}
	});
}

// Populate the `test` database with data from `test_data.json`
fs.readFile('./test_data.json',function(err, data){
	var aData = JSON.parse(data);
	for (var n = 0; n < aData.length; n++){
		insertDoc(aData[n],0);
	}
});

// Start the server
var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});

// Configure our app to serve static files from the current directory
app.use(express.static('./'));

// Display `index.html` when localhost:3000 is requested
app.get('/', function (req, res) {
  res.sendFile('./index.html', {root: './'});
});

// Send all records when there's a GET request to `localhost:3000/test`
app.get('/test', function (req, res) {
	db.list({ include_docs: true }, function(err, body){
		res.send(body);
	});
});