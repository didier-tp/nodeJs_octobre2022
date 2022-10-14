//var express = require('express');
import express, { NextFunction , Request , Response } from 'express';
const apiRouter = express.Router();

import { IDevise, Devise } from './model/devise';
import { SqDeviseService } from './dao/sqDeviseService';

var  deviseService = new SqDeviseService();


//exemple URL: http://localhost:8282/devise-api/private/reinit
apiRouter.route('/devise-api/private/reinit')
.get( async function(req : Request , res : Response , next :NextFunction ) {
	try{
		 await deviseService.initDataSet();
		 //res.send({message:"database initialized"})
		 let deviseArray = await deviseService.findAll();
		 res.send(deviseArray);
	}catch(ex){
		next(ex); //to errorHandler
	}
});

class ResConv{
    constructor(public montant : number = 1,
                public source : string | null = null,
                public cible : string | null = null,
                public montantConverti : number = 1){}
}


// http://http://localhost:8282/deviseApi/rest/public/devise-conversion?montant=50&source=EUR&cible=USD renvoyant 
// {"montant":50.0,"source":"EUR","cible":"USD","montantConverti":56.215}
apiRouter.route('/devise-api/public/devise-conversion')
.get(	function(req :Request, res :Response , next: NextFunction ) {
    const  montant = Number(req.query.montant);
    const  source = req.query.source?.toString() || "";
    const  cible = req.query.cible?.toString()  || "";
    //on demande à la base de données les détails de la devise source
	deviseService.findByIdCb( source ,
		function (deviseSource,err){
		if(err!=null || deviseSource==null )
			res.status(404).send({ message:"devise source pas trouvee"}) ;
		else
			//callback avec deviseSource si tout va bien
			//2 nd appel pour récupérer les détails de la devise cible:
			deviseService.findByIdCb( cible ,
			function (deviseCible,err){
				if(err!=null || deviseCible==null )
					res.status(404).send({ message:"devise cible pas trouvee"}) ;
				else {
					//callback avec deviseCible si tout va bien
					var montantConverti = montant * deviseCible.change / deviseSource.change;
					res.send ( { montant : montant ,
						source :source ,
						cible : cible ,
						montantConverti : montantConverti 
					   });
					}
				});//end of .findByIdCb( cible ,...
		});//end of .findByIdCb( source ,..			
});//end of route


//exemple URL: http://localhost:8282/devise-api/public/devise/EUR
apiRouter.route('/devise-api/public/devise/:code')
.get( async function(req : Request , res : Response , next :NextFunction ) {
	try{
		let codeDevise = req.params.code;
		let devise = await deviseService.findById(codeDevise)
		res.send(devise);
	}catch(ex){
		next(ex); //to errorHandler
	}
});

//exemple URL: http://localhost:8282/devise-api/public/devise (returning all devises)
//             http://localhost:8282/devise-api/public/devise?changeMini=1.05
apiRouter.route('/devise-api/public/devise')
.get( async function(req : Request , res : Response , next :NextFunction ) {
	try{
		let changeMini = Number(req.query.changeMini);
		let deviseArray = await deviseService.findAll();
		if(changeMini){
				//filtrage selon critère changeMini:
				deviseArray = deviseArray.filter((dev)=>dev.change >= changeMini);
			}
		res.send(deviseArray)
	}catch(ex){
		next(ex); //to errorHandler
	}
});


// http://localhost:8282/devise-api/private/role-admin/devise en mode post
// avec { "code" : "mxy" , "nom" : "monnaieXy" , "change" : 123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.post( async function(req : Request , res : Response , next :NextFunction) {
	try{
		let nouvelleDevise : Devise = req.body;
		let savedDevise = await deviseService.saveOrUpdate(nouvelleDevise);
		res.send(savedDevise);
	}catch(ex){
		next(ex); //to errorHandler
	}
});

// http://localhost:8282/devise-api/private/role-admin/devise en mode PUT
// avec { "code" : "USD" , "nom" : "Dollar" , "change" : 1.123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.put( async function(req : Request , res : Response , next :NextFunction ) {
	try{
		let newValueOfDeviseToUpdate = req.body;
		let updatedDevise = await deviseService.update(newValueOfDeviseToUpdate);
		res.send(updatedDevise);
	}catch(ex){
		next(ex); //to errorHandler
	}
});

// http://localhost:8282/devise-api/private/role-admin/devise/EUR en mode DELETE
apiRouter.route('/devise-api/private/role-admin/devise/:code')
.delete( async function(req : Request , res : Response , next :NextFunction ) {
	try{
		let codeDevise = req.params.code;
		console.log("DELETE,codeDevise="+codeDevise);
		await deviseService.deleteById(codeDevise);
		res.send({ deletedDeviseCode : codeDevise } );
	}catch(ex){
		next(ex); //to errorHandler
	}
});

/*
// http://http://localhost:8282/deviseApi/rest/public/devise-conversion?montant=50&source=EUR&cible=USD renvoyant 
// {"montant":50.0,"source":"EUR","cible":"USD","montantConverti":56.215}
apiRouter.route('/devise-api/public/devise-conversion')
.get(	function(req :Request, res :Response , next: NextFunction ) {
    const  montant = Number(req.query.montant);
    const  source = req.query.source?.toString() || "";
    const  cible = req.query.cible?.toString()  || "";
    let changeSource : number ;
    let changeCible : number ;
    const resConv = new ResConv(montant,source,cible,0);
    deviseService.findById(source)
    .then((deviseSource)=> { changeSource = deviseSource.change;
                             return deviseService.findById(cible)
                           })
    .then((deviseCible)=> { changeCible = deviseCible.change;
                            resConv.montantConverti = montant * changeCible / changeSource;
                          res.send(resConv);
                          })
    .catch((err)=>next(err));
});
*/


export default { apiRouter };//pour import as deviseApiRoutes from './devise-api-routes-sq';