'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const publicDir = require('path').join(__dirname, 'dist');
const port = process.env.PORT || 3000;


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



let app = express();

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.use(session({secret: 'something secret'}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/login', passport.authenticate('local'), function(req, res, next) {
	console.log('login: ', req.user);
	res.json(req.user);
});

app.get('/api/dashboard', function(req, res) {
	if(req.isAuthenticated()) {
		// TODO
		//res.json(req.user);
	} else req.send(401);
});

app.get('/api/logout', function(req, res) {
	req.logOut();
	res.send(200);
});

app.listen(port, function() {
	console.log('Server started on port', port);
});
