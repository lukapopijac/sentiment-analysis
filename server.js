'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const publicDir = require('path').join(__dirname, 'dist');
const WebSocketServer = require('ws').Server;
const port = process.env.PORT || 3000;


// database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sentimentdb');
require('./src-back/db-models');
let JournalEntryModel = mongoose.model('JournalEntry');
var FamilyModel = mongoose.model('Family');
var UserModel = mongoose.model('User');


// authentication
passport.use(new LocalStrategy(
	function(username, password, done) {
		UserModel.findOne({username, password}, function(err, user) {
			if(user) return done(null, {
				name: user.name, 
				head: user.head,
				_id: user._id, 
				family: user.family
			});
			return done(null, false, 'Unable to login');
		});
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
	else res.sendStatus(401);
}


// web sockets
const sockets = {};
let wss = new WebSocketServer({port: 5000});
wss.on('connection', function(ws, req) {
	var [username, password] = req.url.slice(1).split('/');
	UserModel.findOne({username, password})
		.then(function(user) {
			if(!user.head) {
				ws.terminate();
				return Promise.reject('unauthorized');
			}
			sockets[user._id] = ws;
			calcAndSendAvgSentiment(ws, user.family);
		})
		.catch(function(err) {
			console.error(err);
		})
	;
});


// server
let app = express();

app.use(morgan('dev'));
app.use(express.static(publicDir));
app.use(session({secret: 'something secret'}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/login', passport.authenticate('local'), function(req, res, next) {
	res.json(req.user);
});
app.post('/api/logout', function(req, res) {
	if(sockets[req.user._id]) sockets[req.user._id].terminate();
	sockets[req.user._id] = null;
	req.logOut();
	res.sendStatus(200);
});

app.get('/api/dashboard', authenticationMiddleware, function(req, res) {
	JournalEntryModel.find({user: req.user._id}, function(err, journalEntries) {
		if(err) res.status(400).send(err);
		if(req.user.head) {
			// TODO
			res.json({
				user: req.user,
				journalEntries
			});
		} else {
			res.json({
				user: req.user,
				journalEntries
			});
		}
	});
});


app.get('/api/journal-entries', authenticationMiddleware, function(req, res) {
	JournalEntryModel.find(function(err, entries) {
		if(err) res.status(400).send(err);
		else if(!entries || entries.length == 0) res.send(204);
		else res.json(entries);
	});
});
app.post('/api/journal-entries', authenticationMiddleware, function(req, res) {
	let entry = Object.assign({
			user: req.user._id,
			datetime: new Date().toJSON()
		}, req.body)
	;
	new JournalEntryModel(entry).save(function(err, data) {
		if(err) res.status(400).send(err);
		else {
			res.status(201).json(data);
			UserModel.find({family: req.user.family, head: true})
				.then(function(heads) {
					heads.forEach(head => calcAndSendAvgSentiment(sockets[head._id], req.user.family))
				})
				.catch(function(err) {
					console.error(err);
				})
			;
		}
	});
});


function calcAndSendAvgSentiment(socket, family_id) {
	// TODO
	if(!socket) return;
	UserModel.find({family: family_id})
		.then(function(users) {
			return Promise.all(
				users.map(user => JournalEntryModel.find({user: user._id}))
			);
		})
		.then(function(journalEntriesUnflat) {
			let avgSentiment = []
				.concat.apply([], journalEntriesUnflat)  // flatten
				.map(entry => entry.happinessLevel)
				.reduce((acc, cur) => acc+cur, 0)
			;
			
			socket.send(JSON.stringify({avgSentiment}));
		})
		.catch(function(err) {
			console.error(err);
		});
}

app.listen(port, function() {
	console.log('Server started on port', port);
});
