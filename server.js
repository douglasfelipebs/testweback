var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('./src/models/user');
var port = process.env.PORT || 5000
var mongoose   = require('mongoose');

const DATABASE_URI='mongodb://oiler:123456abcde@ds251889.mlab.com:51889/bombeirosibirama'

mongoose.connect(DATABASE_URI); // connect to our database

app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
})

router.route('/user')
    .post(function(req, res) {

        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the bears name (comes from the request)
        user.id = req.body.id;

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });


app.use('/api', router);

app.listen(port);
console.log('server started ' + port);