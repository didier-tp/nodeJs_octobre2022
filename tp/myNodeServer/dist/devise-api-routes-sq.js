"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//var express = require('express');
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
const sqDeviseService_1 = require("./dao/sqDeviseService");
var deviseService = new sqDeviseService_1.SqDeviseService();
//exemple URL: http://localhost:8282/devise-api/private/reinit
apiRouter.route('/devise-api/private/reinit')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield deviseService.initDataSet();
            //res.send({message:"database initialized"})
            let deviseArray = yield deviseService.findAll();
            res.send(deviseArray);
        }
        catch (ex) {
            next(ex); //to errorHandler
        }
    });
});
class ResConv {
    constructor(montant = 1, source = null, cible = null, montantConverti = 1) {
        this.montant = montant;
        this.source = source;
        this.cible = cible;
        this.montantConverti = montantConverti;
    }
}
// http://http://localhost:8282/deviseApi/rest/public/devise-conversion?montant=50&source=EUR&cible=USD renvoyant 
// {"montant":50.0,"source":"EUR","cible":"USD","montantConverti":56.215}
apiRouter.route('/devise-api/public/devise-conversion')
    .get(function (req, res, next) {
    var _a, _b;
    const montant = Number(req.query.montant);
    const source = ((_a = req.query.source) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    const cible = ((_b = req.query.cible) === null || _b === void 0 ? void 0 : _b.toString()) || "";
    //on demande à la base de données les détails de la devise source
    deviseService.findByIdCb(source, function (deviseSource, err) {
        if (err != null || deviseSource == null)
            res.status(404).send({ message: "devise source pas trouvee" });
        else
            //callback avec deviseSource si tout va bien
            //2 nd appel pour récupérer les détails de la devise cible:
            deviseService.findByIdCb(cible, function (deviseCible, err) {
                if (err != null || deviseCible == null)
                    res.status(404).send({ message: "devise cible pas trouvee" });
                else {
                    //callback avec deviseCible si tout va bien
                    var montantConverti = montant * deviseCible.change / deviseSource.change;
                    res.send({ montant: montant,
                        source: source,
                        cible: cible,
                        montantConverti: montantConverti
                    });
                }
            }); //end of .findByIdCb( cible ,...
    }); //end of .findByIdCb( source ,..			
}); //end of route
//exemple URL: http://localhost:8282/devise-api/public/devise/EUR
apiRouter.route('/devise-api/public/devise/:code')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let codeDevise = req.params.code;
            let devise = yield deviseService.findById(codeDevise);
            res.send(devise);
        }
        catch (ex) {
            next(ex); //to errorHandler
        }
    });
});
//exemple URL: http://localhost:8282/devise-api/public/devise (returning all devises)
//             http://localhost:8282/devise-api/public/devise?changeMini=1.05
apiRouter.route('/devise-api/public/devise')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let changeMini = Number(req.query.changeMini);
            let deviseArray = yield deviseService.findAll();
            if (changeMini) {
                //filtrage selon critère changeMini:
                deviseArray = deviseArray.filter((dev) => dev.change >= changeMini);
            }
            res.send(deviseArray);
        }
        catch (ex) {
            next(ex); //to errorHandler
        }
    });
});
// http://localhost:8282/devise-api/private/role-admin/devise en mode post
// avec { "code" : "mxy" , "nom" : "monnaieXy" , "change" : 123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
    .post(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let nouvelleDevise = req.body;
            let savedDevise = yield deviseService.saveOrUpdate(nouvelleDevise);
            res.send(savedDevise);
        }
        catch (ex) {
            next(ex); //to errorHandler
        }
    });
});
// http://localhost:8282/devise-api/private/role-admin/devise en mode PUT
// avec { "code" : "USD" , "nom" : "Dollar" , "change" : 1.123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
    .put(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newValueOfDeviseToUpdate = req.body;
            let updatedDevise = yield deviseService.update(newValueOfDeviseToUpdate);
            res.send(updatedDevise);
        }
        catch (ex) {
            next(ex); //to errorHandler
        }
    });
});
// http://localhost:8282/devise-api/private/role-admin/devise/EUR en mode DELETE
apiRouter.route('/devise-api/private/role-admin/devise/:code')
    .delete(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let codeDevise = req.params.code;
            console.log("DELETE,codeDevise=" + codeDevise);
            yield deviseService.deleteById(codeDevise);
            res.send({ deletedDeviseCode: codeDevise });
        }
        catch (ex) {
            next(ex); //to errorHandler
        }
    });
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
exports.default = { apiRouter }; //pour import as deviseApiRoutes from './devise-api-routes-sq';
