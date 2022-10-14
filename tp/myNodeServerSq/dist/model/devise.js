"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Devise = void 0;
//exemples: ("USD" , "dollar" , 1) ,  ("EUR" , "euro" , 0.9)
//real class for instanciation ,  with constructor .
class Devise {
    constructor(code = "?", nom = "?", change = 0) {
        this.code = code;
        this.nom = nom;
        this.change = change;
    }
}
exports.Devise = Devise;
