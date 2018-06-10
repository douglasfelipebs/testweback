var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var appRoutes = express();
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('./src/models/user');
var MyApp = require('./src/models/app');
var BombeiroVoluntario = require('./src/models/bombeiroVoluntario');
var Noticia = require('./src/models/noticia');
var PrimeirosSocorros = require('./src/models/primeirosSocorros');
var port = process.env.PORT || 5000
var mongoose   = require('mongoose');
var schedule = require('node-schedule');

const DATABASE_URI='mongodb://oiler:123456abcde@ds251889.mlab.com:51889/bombeirosibirama'

mongoose.connect(DATABASE_URI); // connect to our database

var db = mongoose.connection;

mongoose.set('debug', true);

db.on('error', console.error.bind(console,'# Mongo DB: connection error:'));

appRoutes.use(serveStatic(path.join(__dirname, 'dist')));
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//JOB

var j = schedule.scheduleJob({hour: 0, minute: 0}, function(){
    MyApp.findById('5b1085faa9d9f115c8a006f7', function(err, app) {
        if (err) {
            console.error('error, no entry found');
        }
        app.diasSemAcidentes += 1;
        app.save();
    })
    console.log('Adicionou 1 aos dias sem acidentes');
});


//develop
//var cors = require('cors')

//app.use(cors())

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    // do logging

    console.log('requisicao BODY', req.body)
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
  /*  var user = new User();
    user.id = 500
    user.name = 'admin'
    user.password = 'admin'
    user.save((err) => {
        if (err)
            res.send(err);

        res.json({ message: 'User created!' });
    });*/

    res.json({ message: 'hooray! welcome to our api!' });
})

router.route('/user')
    .post(function(req, res) {

        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the bears name (comes from the request)
        user.id = req.body.id;

        // save the bear and check for errors
        user.save(function(err) {
            if (err) return res.status(500).send(err)

            res.json({ message: 'User created!' });
        });

    })
    .get(function(req, res) {
        User.find((err, users) => {
            if (err) return res.status(500).send(err)

            res.header('Access-Control-Allow-Origin', '*')
            return res.status(200).send(users);
        });
    });

router.route('/bombeirovoluntario')
    .post(function(req, res) {
        var voluntario = new BombeiroVoluntario();      // create a new instance of the User model
        voluntario.name = req.body.name;
        voluntario.email = req.body.email;
        voluntario.telefone = req.body.telefone;
        voluntario.endereco = req.body.endereco;
        voluntario.nadador  = req.body.nadador;
        voluntario.date = req.body.date;

        // save the bear and check for errors
        voluntario.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Voluntary created!' });
        });

    })
    .get(function(req, res) {
        BombeiroVoluntario.find((err, voluntarios) => {
            if (err) return res.status(500).send(err)

            res.header('Access-Control-Allow-Origin', '*')
            return res.status(200).send(voluntarios);
        });
    });

router.route('/dashboard/bombeirovoluntario/:bombeiro_id')
    .delete(function(req, res) {

        BombeiroVoluntario.findByIdAndRemove(req.params.bombeiro_id, (err, bombeiro) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.

            const response = {
                message: "Bombeiro voluntário excluído com sucesso",
                id: bombeiro._id
            };
            return res.status(200).send(response);
        })
    })

router.route('/dashboard/noticia')
    .post(function(req, res) {
        let noticia = new Noticia();
        noticia.imgUrl       = req.body.imgUrl;
        noticia.imgDescricao = req.body.imgDescricao;
        noticia.titulo       = req.body.titulo;
        noticia.corpoTexto   = req.body.corpoTexto;
        noticia.favorito     = req.body.favorito;
        noticia.date         = req.body.date;

        noticia.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'News created!' });
        });

    })
    .get(function(req, res) {
        Noticia.find((err, noticias) => {
            if (err) return res.status(500).send(err)

            res.header('Access-Control-Allow-Origin', '*')
            return res.status(200).send(noticias);
        });
    })



router.route('/app').get(function (req, res) {
    MyApp.find((err, app) => {
        if (err) return res.status(500).send(err)

        res.header('Access-Control-Allow-Origin', '*')
        return res.status(200).send(app);
    });
})

router.route('/app/:app_id').put(function (req, res) {

    MyApp.findByIdAndUpdate( req.params.app_id,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, app) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(app);
        })
})


router.route('/dashboard/noticias/:noticia_id')
    .delete(function(req, res) {

        Noticia.findByIdAndRemove(req.params.noticia_id, (err, noticia) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.

            const response = {
                message: "News successfully deleted",
                id: noticia._id
            };
            return res.status(200).send(response);
        })
    })
    .put(function (req, res) {

        Noticia.findByIdAndUpdate( req.params.noticia_id,

            // the change to be made. Mongoose will smartly combine your existing
            // document with this change, which allows for partial updates too
            req.body,

            // an option that asks mongoose to return the updated version
            // of the document instead of the pre-updated one.
            {new: true},

            // the callback function
            (err, noticia) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send(noticia);
            })
    })

router.route('/dashboard/primeirossocorros')
    .post(function(req, res) {
        let primeirosSocorros = new PrimeirosSocorros();
        primeirosSocorros.titulo   = req.body.titulo;
        primeirosSocorros.sintomas = req.body.sintomas;
        primeirosSocorros.reagir   = req.body.reagir;
        primeirosSocorros.date     = req.body.date;

        primeirosSocorros.save(function(err) {
            if (err) return res.status(500).send(err)

            res.json({ message: 'Primeiros Socorros criado!' });
        });

    })
    .get(function(req, res) {
        PrimeirosSocorros.find((err, primeirosSocorros) => {
            if (err) return res.status(500).send(err)

            res.header('Access-Control-Allow-Origin', '*')
            return res.status(200).send(primeirosSocorros);
        });
    })

router.route('/dashboard/primeirossocorros/:primeirossocorros_id')
    .delete(function(req, res) {

        PrimeirosSocorros.findByIdAndRemove(req.params.primeirossocorros_id, (err, primeirosSocorros) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.

            const response = {
                message: "Primeiros Socorros deletado com sucessos",
                id: primeirosSocorros._id
            };
            return res.status(200).send(response);
        })
    })
    .put(function (req, res) {

        PrimeirosSocorros.findByIdAndUpdate(req.params.primeirossocorros_id,

            // the change to be made. Mongoose will smartly combine your existing
            // document with this change, which allows for partial updates too
            req.body,

            // an option that asks mongoose to return the updated version
            // of the document instead of the pre-updated one.
            {new: true},

            // the callback function
            (err, primeirosSocorros) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send(primeirosSocorros);
            })
    })

app.use('/api', router);

appRoutes.get('/PrimeirosSocorros', function (req, res) {
    res.send('GET request to PrimeirosSocorros');
});

appRoutes.get('/Doacoes', function (req, res) {
    res.send('GET request to Doacoes');
});

app.listen(port);
console.log('server started ' + port);