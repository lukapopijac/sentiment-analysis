'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const publicDir = require('path').join(__dirname, 'dist');
const port = process.env.PORT || 3000;


// set up passport
passport.use(new LocalStrategy(
	function(username, password, done) {
		if(username=='abc') done(null, {us: 'ABC'});
		else if(username=='def') done(null, {us: 'DEF'});
		else done(null, false, 'krivo!');
	}
));
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

function authenticationMiddleware(req, res, next) {
	if(req.isAuthenticated()) next();
	else res.send(401);
}

// database connect
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jdbsentimentdb');
require('./src-back/db-models');


// server
let app = express();

app.use(morgan('dev'));
app.use(express.static(publicDir));
app.use(session({secret: 'something secret'}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

app.post('/api/login', passport.authenticate('local'), function(req, res, next) {
	console.log('login: ', req.user);
	res.json(req.user);
});

app.get('/api/logout', function(req, res) {
	req.logOut();
	res.send(200);
});


let sendErrorResponse = function(next, status, msg) {
	let error = new Error();
	error.status = status;
	error.message = "Executing call to /apartments. " + msg;
	next(error);
};


let JournalEntries = mongoose.model('JournalEntries');
app.get('/api/journal-entries', authenticationMiddleware, function(req, res) {
    JournalEntries.find(function(err, entries) {
        if(err) res.status(400).send(err);
        else if(!entries || entries.length == 0) res.send(204);
        else res.json(entries);
    });
});
app.post('/api/journal-entries', authenticationMiddleware, function(req, res) {
	let newJournalEntry = req.body;
	let journalEntries = new JournalEntries(newJournalEntry);
	journalEntries.save(function(err, data) {
		if(err) res.status(400).send(err);
		else res.status(201).json(data);
	});
});



app.listen(port, function() {
	console.log('Server started on port', port);
});
