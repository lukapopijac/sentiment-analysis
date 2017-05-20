'use strict';

const mongoose = require('mongoose');
require('./db-models');

let saveCallBack = function(error, data) {
    if(error){
        console.log('Error:');
        console.log(error);
    }
    else{
		console.log('Save:');
        console.log(data);
    }
};

mongoose.connect('mongodb://localhost:27017/sentimentdb');

// insert families
let Family = mongoose.model('Families');
Family.collection.drop();
let family = new Family({name: 'family1'});
family.save(saveCallBack);


// insert users
var User = mongoose.model('Users');
User.collection.drop();
var user = new User({
	name: 'Big Guy',
	username: 'big',
	password: 'big'
});
user.save(saveCallBack);

//insert journal entries
var JournalEntry = mongoose.model('JournalEntries');
JournalEntry.collection.drop();
var entry = new JournalEntry({
	datetime: '2017-05-18T13:04:00',
	happinessLevel: 7,
	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dolor metus, fermentum a condimentum auctor.'
});
entry.save(saveCallBack);


mongoose.connection.close();
