"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//necessite "esModuleInterop" : true, dans tsconfig.json
var app = (0, express_1.default)();
app.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('<p>index  (welcome page)  of simpleApp</p>');
    res.write('<a href="addition?a=5&b=6">5+6</a><br/>');
    res.write('<a href="addition?a=7&b=8">7+8</a><br/>');
    res.write("</body></html>");
    res.end();
});
//GET addition?a=5&b=6
app.get('/addition', function (req, res, next) {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    let resAdd = a + b;
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('a=' + a + '<br/>');
    res.write('b=' + b + '<br/>');
    res.write('a+b=' + resAdd + '<br/>');
    res.write('<hr/><a href="/">nouveau calcul</a>');
    res.write("</body></html>");
    res.end();
});
app.listen(8282, function () {
    console.log("simple express node server http://localhost:8282");
});
