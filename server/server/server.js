require('babel-core/register');
require("babel-polyfill");
require("babel-core").transform("code", {
  plugins: ["transform-async-to-generator", "transform-es2015-arrow-functions"]
});
import restify from "restify";
import AuthentificationMetier from "./metier/AuthentificationMetier";
import elasticsearch from "./db";

elasticsearch.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

const fs = require('fs'),
  path = require('path');
const port = process.env.port || 8000;

//Création du serveur
const server = restify.createServer({
    name : "sport_server"
});

//Plugin
server.use(restify.gzipResponse());
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
  origins: [
    'http://37.187.23.89',
  ]
}));

//Middleware sur toutes les urls
server.use(function(req, res, next){

    if(!req.url.startsWith("/api/"))
    {
        return next();
    }

    const authentification = new AuthentificationMetier();
    const token = authentification.getToken(req);
    if(!token)
    {
        res.send(401, "Non autorisé");
    }

    const id_user = authentification.decode(token);
    if(!id_user)
    {
        res.send(401, "Non autorisé");
    }

    req.id_user = id_user;
    return next();
});

server.get('/videos/competitions/:name', restify.serveStatic({
  directory: path.join(__dirname, '/uploads'),
}));

const pathController = path.join(__dirname, 'controller');
for(const file of fs.readdirSync(pathController))
{
  let x = require(pathController + "/" + file);
  new x(server);
}

server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});