"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai")); //npm install --save-dev chai
//npm install --save-dev @types/chai 
//npm install --save-dev mocha
//npm install --save-dev @types/mocha
const calcul_1 = require("../calcul");
const expect = chai_1.default.expect;
describe("tests de calculs", () => {
    it("carre de 5 vaut bien 25", () => {
        const resCarre = (0, calcul_1.carre)(5);
        expect(resCarre).to.equal(25);
    });
});
