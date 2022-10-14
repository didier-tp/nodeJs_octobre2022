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
const promises_1 = __importDefault(require("fs/promises")); //with npm install --save-dev @types/node
const node_readline_1 = __importDefault(require("node:readline"));
function buildStatFromProduits() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let stat = { min: 9999999999, max: -99999999999, sum: 0, average: 0 };
            let fileProduits = yield promises_1.default.open('produits.csv', 'r');
            let nbLignes = 0;
            let rl = node_readline_1.default.createInterface({
                input: fileProduits.createReadStream(),
                output: process.stdout,
                terminal: false
            });
            rl.on('line', function (lineText) {
                console.log("line=" + lineText);
                //CODE A COMPLETER EN TP
            });
            rl.on('close', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    //CODE A COMPLETER EN TP
                    //ECRIRE via fs.writeFile('stats.json', ....);
                    console.log("stats.json généré ou remplacé");
                });
            });
        }
        catch (err) {
            console.error("err=" + err);
        }
    });
}
buildStatFromProduits();
