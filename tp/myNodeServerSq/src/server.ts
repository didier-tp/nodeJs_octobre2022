
import express from 'express';
import { initSequelize } from './model/global-db-model'

//import deviseApiRoutes from './devise-api-routes-memory';
import deviseApiRoutes from './devise-api-routes-sq';

import { apiErrorHandler} from './apiErrorHandler'

var app = express();

//support parsing of JSON post data
var jsonParser = express.json(/*{ extended: true }*/);
app.use(jsonParser);



// CORS enabled with express/node-js :
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //ou avec "www.xyz.com" à la place de "*" en production
  res.header("Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, PATCH"); //default: GET, ...
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
    //to give access to all the methods provided
    return res.status(200).json({});
  }
  next();
});


//les routes en /html/... seront gérées par express par
//de simples renvois des fichiers statiques
//du répertoire "./html"
app.use('/html', express.static(__dirname+"/html"));

app.get('/', function(req , res ) {
  res.redirect('/html/index.html');
});

/*
app.use(function(req, res, next) {
  //dans index.html devise-api/public/devise?x_username=toto&x_password=pwdtoto
  let username = req.query.x_username || req.headers.x_username;
  let password = req.query.x_password || req.headers.x_password;
  if(password != "pwd"+username){
    res.status(401).send({ err : "Echec Authentification" })
  }
  else next();
});
*/

// delegate REST API routes to apiRouter(s)
//app.use(produitApiRoutes.apiRouter);
app.use(deviseApiRoutes.apiRouter);

app.use(apiErrorHandler);

app.listen(8282, function () {
  console.log("http://localhost:8282");
  initSequelize();
  
});