import { carre , racineCarree} from "./calcul";

let y = carre(6);
console.log("carre de 6=" + y);

y = racineCarree(9);
console.log("racineCarre de 9=" + y);

let xyz = process.env.XYZ || "default_value_for_XYZ" ;
console.log("xyz="+xyz);