//var express = require('express');
import express, { NextFunction , Request , Response } from 'express';
const apiRouter = express.Router();

class Devise {
	constructor(public code : string = '',
	            public nom : string = '' ,
				public change : number = 0) {}
}

var allDevises :Devise[] = [];

allDevises.push({ code : 'EUR' , nom : 'Euro' , change : 1.0 });
allDevises.push({ code : 'USD' , nom : 'Dollar' , change : 1.1 });
allDevises.push({ code : 'JPY' , nom : 'Yen' , change : 123 });
allDevises.push({ code : 'GBP' , nom : 'Livre' , change : 0.9 }); 

function findDeviseInArrayByCode(devises : Devise[],code:string):Devise|null{
	var devise=null;
	for(let i in devises){
		if(devises[i].code == code){
			  devise=devises[i]; break;
		}
	}
	return devise;
}

function removeDeviseInArrayByCode(devises: Devise[],code:string){
	let delIndex : any;
	for(let i in devises){
		if(devises[i].code == code){
			  delIndex=i; break;
		}
	}
	if(delIndex){
		devises.splice(delIndex,1);
	}
}

function findDevisesWithChangeMini(devises: Devise[],changeMini:number):Devise[]{
	var selDevises=[];
	for(let i in devises){
		if(devises[i].change >= changeMini){
			  selDevises.push(devises[i]);
		}
	}
	return selDevises;
}

//exemple URL: http://localhost:8282/devise-api/public/devise/EUR
apiRouter.route('/devise-api/public/devise/:code')
.get( function(req : Request , res : Response , next :NextFunction ) {
	let codeDevise = req.params.code;
	let devise = findDeviseInArrayByCode(allDevises,codeDevise);
	res.send(devise);
});

//exemple URL: http://localhost:8282/devise-api/public/devise (returning all devises)
//             http://localhost:8282/devise-api/public/devise?changeMini=1.05
apiRouter.route('/devise-api/public/devise')
.get( function(req : Request , res : Response , next :NextFunction ) {
	var changeMini = Number(req.query.changeMini);
	if(changeMini){
		res.send(findDevisesWithChangeMini(allDevises,changeMini));
	}else{
	   res.send(allDevises);
	}
});


// http://localhost:8282/devise-api/private/role-admin/devise en mode post
// avec { "code" : "mxy" , "nom" : "monnaieXy" , "change" : 123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.post( function(req : Request , res : Response , next :NextFunction) {
	var nouvelleDevise = req.body;
	console.log("POST,nouvelleDevise="+JSON.stringify(nouvelleDevise));
	allDevises.push(nouvelleDevise);
	res.send(nouvelleDevise);
});

// http://localhost:8282/devise-api/private/role-admin/devise en mode PUT
// avec { "code" : "USD" , "nom" : "Dollar" , "change" : 1.123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.put( function(req : Request , res : Response , next :NextFunction ) {
	var newValueOfDeviseToUpdate = req.body;
	console.log("PUT,newValueOfDeviseToUpdate="+JSON.stringify(newValueOfDeviseToUpdate));
	var deviseToUpdate = findDeviseInArrayByCode(allDevises,newValueOfDeviseToUpdate.code);
	if(deviseToUpdate!=null){
		deviseToUpdate.nom = newValueOfDeviseToUpdate.nom;
		deviseToUpdate.change = newValueOfDeviseToUpdate.change;
		res.send(deviseToUpdate);
	}else{
		res.status(404).json({ error : "no devise to update with code=" + newValueOfDeviseToUpdate.code });
	}
	
});

// http://localhost:8282/devise-api/private/role-admin/devise/EUR en mode DELETE
apiRouter.route('/devise-api/private/role-admin/devise/:code')
.delete( function(req : Request , res : Response , next :NextFunction ) {
	var codeDevise = req.params.code;
	console.log("DELETE,codeDevise="+codeDevise);
	removeDeviseInArrayByCode(allDevises,codeDevise);
	res.send({ deletedDeviseCode : codeDevise } );
});


//export { apiRouter };//pour import * as deviseApiRoutes from './devise-api-routes-memory.js';
export default { apiRouter };//pour import as deviseApiRoutes from './devise-api-routes-memory.js';