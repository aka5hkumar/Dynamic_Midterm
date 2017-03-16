var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var db;

MongoClient.connect('mongodb://admin:secure@ds145369.mlab.com:45369/kash', function(err, database) {
    if (err) return console.log(err);
    db = database;
    app.listen(process.env.PORT || 3000);
});


//Routes

app.get('/', function(req, res) {
    db.collection.findOne({
            'username': username
        })
        .then(function(result) {
                if (null != result) {
                    console.log("USERNAME ALREADY EXISTS:", result.username);
                    res.redirect('/dashboard/' + result.username);
                } else {
                    res.render('create_user', {
                        user: result
                    });
                    collection.insert(username)
                });
        });
});

app.get('/dashboard', function(req, res) {
    res.render('dashboard', {
        user: req.user
    });
});

app.get('/add', function(req, res) {
    res.render('add');
});
app.post('/add', function(req, res) {
    var item = {
        name: req.body.name.trim(),
        price: req.body.price.trim(),
        date: parseInt(req.body.age),
    };
});
app.get('/modify', function(req, res) {
    db.collection(user).findOne({
        name: req.params.name
    }, function(err, result) {
        if (err) console.log(err);
        res.render(user, {
            user: result
        });
    });
});
app.post('/modify', function(req, res) {
    var item = {
        name: req.body.name.trim(),
        price: req.body.price.trim(),
        date: parseInt(req.body.age),
    };
});

// thats it!
