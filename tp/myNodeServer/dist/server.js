"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//var express = require('express');
const express_1 = __importDefault(require("express"));
//var produitApiRoutes = require('./produit-api-routes-memory')
//import produitApiRoutes from './produit-api-routes-memory.js';
//var deviseApiRoutes = require('./devise-api-routes-memory')
const devise_api_routes_memory_1 = __importDefault(require("./devise-api-routes-memory"));
//var deviseApiRoutes = require('./devise-api-routes-mongoose-cb')
//import deviseApiRoutes from './devise-api-routes-mongoose-cb.js';
var app = (0, express_1.default)();
//support parsing of JSON post data
var jsonParser = express_1.default.json( /*{ extended: true }*/);
app.use(jsonParser);
// CORS enabled with express/node-js :
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //ou avec "www.xyz.com" à la place de "*" en production
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH"); //default: GET, ...
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
app.use('/html', express_1.default.static(__dirname + "/html"));
// delegate REST API routes to apiRouter(s)
//app.use(produitApiRoutes.apiRouter);
app.use(devise_api_routes_memory_1.default.apiRouter);
app.listen(8282, function () {
    console.log("http://localhost:8282");
});
