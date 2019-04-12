var express = require('express');
var exphbs = require('express-handlebars');

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

app.post('/login', function(request, response){
    console.log(request.body);
    response.send('hola');
});

app.listen(3000);