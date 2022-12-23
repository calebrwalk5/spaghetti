const config = require("./config.json");
const multer = require('multer');
const bodyParser = require('body-parser');
const express = require("express");

async function init(app) {
    if (Number(process.version.slice(1).split(".")[0] < 16)) throw new Error(`Node.js v16 or higher is required, Discord.JS relies on this version, please update @ https://nodejs.org`);
    var multerStorage = multer.memoryStorage();
    app.use(multer({ storage: multerStorage }).any());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.set('views', './src/views');
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(express.static('src/static'));
    app.use('/assets', express.static(__dirname + 'public/assets'));
    app.use('/static', express.static(__dirname + 'src/static/assets'));
};

module.exports = {
    init: init
};
