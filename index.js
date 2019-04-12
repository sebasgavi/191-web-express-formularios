var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.listen(3000);