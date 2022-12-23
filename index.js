// Basic Imports
const config = require("./config.json");
const express = require("express");
const app = express();
const chalk = require('chalk');
const fs = require('node:fs');

// Backend Initialization
const backend = require('./backend.js');
backend.init(app);

// Routing
app.get('', async function(req, res) {
    let readMessages = fs.readFileSync('./messages.json');
    readMessages = JSON.parse(readMessages);
    res.render('index.ejs', { messages: readMessages, username: 'Anonymous' });
});

app.post('/backend/create/message', async function(req, res) {
    if(!req.body.username) return;
    if(!req.body.message) return;
    let messages;
    let readMessages = fs.readFileSync('./messages.json');
    readMessages = JSON.parse(readMessages);
    readMessages.push({
        username: req.body.username,
        message: req.body.message.replaceAll('<', '')
    });
    messages = readMessages;
    readMessages = JSON.stringify(readMessages);
    fs.writeFileSync('./messages.json', readMessages);
    res.render('index.ejs', { messages: messages, username: req.body.username });
});

// MAKE SURE THIS IS LAST FOR 404 PAGE REDIRECT
app.get('*', function(req, res){
    res.render('404.ejs');
});

// Server Initialization
app.listen(config.port)
console.log(chalk.blue('ExpressJS Web Application Started on Port ' + config.port));

// Rejection Handler
process.on('unhandledRejection', (err) => { 
    if(config.debugMode) console.log(chalk.red(err));
});