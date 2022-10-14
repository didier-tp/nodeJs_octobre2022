"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confDb = void 0;
const database_cfg_1 = __importDefault(require("./database.cfg"));
let mode = process.env.MODE; //env variable MODE=dev or MODE=prod when launching node
if (mode == undefined)
    mode = "dev";
//if(mode == undefined) mode = "prod";
//console.log("in db-config, mode="+mode);
exports.confDb = (mode == "dev") ? database_cfg_1.default.dev : database_cfg_1.default.prod;
console.log("in db-config, confDb.host=" + exports.confDb.host);
if (exports.confDb.port === undefined) {
    if (exports.confDb.dialect == "mysql") {
        exports.confDb.port = 3306;
    }
}
