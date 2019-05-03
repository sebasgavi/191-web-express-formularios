var express = require('express');
var exphbs = require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tienda';

// Create a new MongoClient
const client = new MongoClient(url);

var db = null;

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    
    db = client.db(dbName);
    
    //client.close();
});


var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(request, response){
    var contexto = {
        titulo: 'Página principal',
    };
    response.render('home', contexto);
});

app.get('/tienda/:categoria', function(request, response){
    
    console.log(request.params.categoria);

    var collection = db.collection('productos');
    // Find some documents
    collection.find({ categoria: request.params.categoria })
        .toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs
        };
        response.render('tienda', contexto);
    });
    
});

app.post('/login', function(request, response){
    // crear un archivo con la información del usuario
    console.log(request.body);
    // redireccionar a otra página
    response.redirect('/bienvenida');
});

app.listen(3000);