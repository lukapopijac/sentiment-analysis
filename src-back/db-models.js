'use strict';

const mongoose = require('mongoose');

let familySchema = new mongoose.Schema({
    name: String,
});

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
	head: Boolean,
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    }
});

let journalEntrySchema = new mongoose.Schema({
	datetime: String,
    text: String,
	happinessLevel: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


mongoose.model("Family", familySchema);
mongoose.model("User", userSchema);
mongoose.model("JournalEntry", journalEntrySchema);
