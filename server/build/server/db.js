'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*const mysql = require('mysql');

//Connexion à la bdd
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pierre',
    password : 'logitech03',
    database : 'sport'
});

connection.connect();*/
var elasticsearch = require('elasticsearch');
var config = require('../config_app');
var client = new elasticsearch.Client({
    host: config.production ? 'http://37.187.23.89:9200' : 'http://localhost:9200'
    //log: 'trace'
});

exports.default = client;