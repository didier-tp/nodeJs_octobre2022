import express , { Request, Response , NextFunction } from 'express' ;
//necessite "esModuleInterop" : true, dans tsconfig.json
//necessite npm install --save-dev @types/express (en plus de npm install -s express)

var app = express();

app.get('/', function(req : Request, res :Response , next :NextFunction) {
res.setHeader('Content-Type', 'text/html');
res.write("<html> <body>");
res.write('<p>index  (welcome page)  of simpleApp</p>');
res.write('<a href="addition?a=5&b=6">5+6</a><br/>');
res.write('<a href="addition?a=7&b=8">7+8</a><br/>');
res.write("</body></html>");
res.end();
});

//GET addition?a=5&b=6
app.get('/addition', function(req : Request, res :Response , next :NextFunction) {
    let a = Number(req.query.a); let b = Number(req.query.b);
    let resAdd = a+b;
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('a=' + a + '<br/>'); res.write('b=' + b + '<br/>');
    res.write('a+b=' + resAdd + '<br/>');
    res.write('<hr/><a href="/">nouveau calcul</a>');
    res.write("</body></html>");
    res.end();
});
    
app.listen(8282 , function () {
        console.log("simple express node server http://localhost:8282");
});