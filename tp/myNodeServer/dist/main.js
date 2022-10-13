"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calcul_1 = require("./calcul");
let y = (0, calcul_1.carre)(6);
console.log("carre de 6=" + y);
y = (0, calcul_1.racineCarree)(9);
console.log("racineCarre de 9=" + y);
let xyz = process.env.XYZ || "default_value_for_XYZ";
console.log("xyz=" + xyz);
