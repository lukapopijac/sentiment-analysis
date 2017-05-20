'use strict';

const mongoose = require('mongoose');

let familiesSchema = new mongoose.Schema({
    name: String,
});

let usersSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Families'
    }
});


let journalEntriesSchema = new mongoose.Schema({
	datetime: String,
    text: String,
	happinessLevel: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});


mongoose.model("Families", familiesSchema);
mongoose.model("Users", usersSchema);
mongoose.model("JournalEntries", journalEntriesSchema);
