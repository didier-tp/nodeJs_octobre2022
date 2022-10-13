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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqDeviseService = void 0;
const devise_1 = require("../model/devise");
const global_db_model_1 = require("../model/global-db-model");
const apiErrorHandler_1 = require("../apiErrorHandler");
class SqDeviseService {
    constructor() {
        this.deviseModelStatic = global_db_model_1.models.devises;
    }
    //old style callback version (pas conseillée , juste pour Tp cb-->Promise):
    findByIdCb(code, cbWithDeviseErr) {
        this.deviseModelStatic.findByPk(code)
            .then((obj) => {
            //returning null by default if not Found
            if (obj != null)
                cbWithDeviseErr(obj, null);
            else
                cbWithDeviseErr(null, new apiErrorHandler_1.NotFoundError("devise not found with code=" + code));
        })
            .catch((error) => { cbWithDeviseErr(null, error); });
    }
    findById(code) {
        return new Promise((resolve, reject) => {
            this.deviseModelStatic.findByPk(code)
                .then((obj) => {
                //returning null by default if not Found
                if (obj != null)
                    resolve(obj);
                else
                    reject(new apiErrorHandler_1.NotFoundError("devise not found with code=" + code));
            })
                .catch((error) => { reject(error); });
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            this.deviseModelStatic.findAll()
                .then((objects) => {
                resolve(objects);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    insert(d) {
        return new Promise((resolve, reject) => {
            this.deviseModelStatic.create(d)
                .then((obj) => {
                //console.log("*** after insert, obj:"+JSON.stringify(obj));
                resolve(obj);
            }).catch((error) => {
                console.log("err:" + JSON.stringify(error));
                reject(error);
            });
        });
    }
    update(d) {
        return new Promise((resolve, reject) => {
            this.deviseModelStatic.update(d, { where: { code: d.code } })
                .then((nbAffectedRows) => {
                if (nbAffectedRows == 1) {
                    // console.log("*** after update, obj:"+JSON.stringify(e));
                    resolve(d);
                }
                else {
                    //soit erreur , soit aucun changement !
                    reject(new Error("no change or no update"));
                }
            }).catch((error) => {
                //console.log("err:"+JSON.stringify(error));
                reject(error);
            });
        });
    }
    saveOrUpdate(d) {
        return new Promise((resolve, reject) => {
            //.upsert() is appropriate for saveOrUpdate if no auto_incr
            this.deviseModelStatic.upsert(d)
                .then((ok) => {
                //console.log("*** after insert, obj:"+JSON.stringify(obj));
                resolve(d);
            }).catch((error) => {
                console.log("err:" + JSON.stringify(error));
                reject(error);
            });
        });
    }
    deleteById(codeDev) {
        return new Promise((resolve, reject) => {
            this.deviseModelStatic.destroy({ where: { code: codeDev } })
                .then(() => {
                resolve();
            }).catch((error) => {
                //console.log("err:"+JSON.stringify(error));
                reject(error);
            });
        });
    }
    initDataSet() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveOrUpdate(new devise_1.Devise("USD", "Dollar", 1));
            yield this.saveOrUpdate(new devise_1.Devise("EUR", "Euro", 0.92));
            yield this.saveOrUpdate(new devise_1.Devise("GBP", "Livre", 0.82));
            yield this.saveOrUpdate(new devise_1.Devise("JPY", "Yen", 132.02));
        });
    }
}
exports.SqDeviseService = SqDeviseService;
