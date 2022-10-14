npm install -g typescript
---------------
npm init pour générer début de package.json
tsc --init pour générer debut de tsconfig.json
-----------------
npm install --save express
npm install --save-dev @types/node
npm install --save-dev @types/express
--------------
tsc 
ou bien
tsc -w (dans terminal dédié)
----------
set XYZ=valXYZ
ou bien
export XYZ=valXYZ
node dist/main.js
---------------
nodemon dist/my_first_express_server.ts
ou bien
nodemon dist/my_first_express_server.ts
apres npm install -g nodemon
----------------
structure:
    src/server.ts
    src/devise-api-route-memory.ts
    dist/html/index.html
-------------
node dist/server.js
   ou bien
nodemon dist/server.js
---------------------
http://localhost:8282 ou bien http://localhost:8282/html/index.html