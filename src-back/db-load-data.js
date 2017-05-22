'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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


let Family = mongoose.model('Family');
let User = mongoose.model('User');
var JournalEntry = mongoose.model('JournalEntry');
Family.collection.drop();
User.collection.drop();
JournalEntry.collection.drop();


let simpson = new Family({name: 'Simpson'});
let griffin = new Family({name: 'Griffin'});

simpson.save(saveCallBack);
griffin.save(saveCallBack);

let homer = new User({name: 'Homer', head: true,  username: 'homer', password: 'homer', family: simpson._id});
let bart  = new User({name: 'Bart',  head: false, username: 'bart',  password: 'bart',  family: simpson._id});
let lisa  = new User({name: 'Lisa',  head: false, username: 'lisa',  password: 'lisa',  family: simpson._id});
let peter = new User({name: 'Peter', head: true,  username: 'peter', password: 'peter', family: griffin._id});

homer.save(saveCallBack);
bart.save(saveCallBack);
lisa.save(saveCallBack);
peter.save(saveCallBack);

new JournalEntry({
	datetime: '2017-05-18T13:04:00',
	happinessLevel: 7,
	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis dolor vel enim ornare semper.',
	user: homer._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T14:04:00',
	happinessLevel: -2,
	text: 'Maecenas quam velit, scelerisque id ultrices sed, elementum semper felis. Phasellus sollicitudin eget ante sed consequat.',
	user: homer._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T15:04:00',
	happinessLevel: -1,
	text: 'Vestibulum sit amet odio orci. Vestibulum magna tortor, dictum posuere lorem ac, ultricies ultrices nisl. Nam sit amet dolor in ex placerat efficitur eu ut eros.',
	user: bart._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T16:04:00',
	happinessLevel: 6,
	text: 'Proin elementum nec sapien a cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vitae cursus risus. Nam id velit dui.',
	user: bart._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T17:04:00',
	happinessLevel: -8,
	text: 'Mauris velit nisi, semper eget congue id, euismod vitae ipsum. Pellentesque leo dui, pretium nec rhoncus in, efficitur nec eros.',
	user: bart._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T18:04:00',
	happinessLevel: 10,
	text: 'Vivamus bibendum iaculis neque, eu convallis augue aliquet et. Mauris tempor aliquet feugiat.',
	user: lisa._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T19:04:00',
	happinessLevel: 4,
	text: 'Vestibulum aliquet dictum nulla, et venenatis libero. Vivamus fringilla leo in ligula lobortis gravida. Praesent pharetra tellus at nunc consectetur viverra.',
	user: lisa._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T20:04:00',
	happinessLevel: 1,
	text: 'In facilisis, nunc vel sodales pretium, neque velit mollis tellus, et pretium sapien urna at tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam non rhoncus ligula. Vestibulum in ex tincidunt, consequat urna vitae, venenatis tortor. Sed mollis odio vel risus varius, sed auctor eros molestie. Pellentesque condimentum iaculis euismod. Nunc at pulvinar augue.',
	user: peter._id
}).save(saveCallBack);
new JournalEntry({
	datetime: '2017-05-18T21:04:00',
	happinessLevel: 7,
	text: 'Maecenas non blandit nisi. Sed consequat mauris quis pharetra pellentesque.',
	user: peter._id
}).save(saveCallBack);


mongoose.connection.close();
