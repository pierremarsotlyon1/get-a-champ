/*const mysql = require('mysql');

//Connexion à la bdd
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pierre',
    password : 'logitech03',
    database : 'sport'
});

connection.connect();*/
const elasticsearch = require('elasticsearch');
const config = require('../config_app');
const client = new elasticsearch.Client({
    host: config.production ? 'http://37.187.23.89:9200' : 'http://localhost:9200',
    //log: 'trace'
});

export default client;