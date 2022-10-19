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
const chai_1 = __importDefault(require("chai"));
const sqDeviseService_1 = require("../dao/sqDeviseService");
const global_db_model_1 = require("../model/global-db-model");
const expect = chai_1.default.expect;
describe("tests de recup devises en database", () => {
    var deviseService = new sqDeviseService_1.SqDeviseService();
    it("devise de code EUR a le nom euro", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, global_db_model_1.initSequelize)();
        yield deviseService.initDataSet();
        const deviseSource = yield deviseService.findById("EUR");
        expect(deviseSource.nom).to.equal("uro");
    }));
});
