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

app.get('/tienda/:categoria?', function(request, response){
    
    console.log(request.query.precio);

    var query = {};
    if(request.params.categoria){
        query.categoria = request.params.categoria;
    }
    if(request.query.precio){
        query.precio = { $lte: request.query.precio };
    }

    var collection = db.collection('productos');
    // Find some documents
    collection.find(query)
        .toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs,
            categoria: request.params.categoria,
            precio: request.query.precio,
            esDiseno: request.params.categoria == "Diseño",
            esArquitectura: request.params.categoria == "Arquitectura",
        };
        response.render('tienda', contexto);
    });
    
});

app.post('/login', function(request, response){
    // crear un archivo con la información del usuario
    console.log(request.body);

    var pedido = {
        correo: request.body.correo,
        contrasena: request.body.contrasena,
        fecha: new Date(),
        estado: 'nuevo',
    };

    var collection = db.collection('pedidos');
    collection.insertOne(pedido, function(err){
        assert.equal(err, null);

        console.log('pedido guardado');
    });
    var contexto = {
        titulo: 'Página principal',
        mensaje: 'pedido guardado',
    };
    response.render('home', contexto);
});

app.listen(3000);