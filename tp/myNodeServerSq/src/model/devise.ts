//GENERIC PART (SEQUELIZE OR NOT)
export interface IDevise  {
   code :string ; 
   nom :string ;
   change :number ;
}

//exemples: ("USD" , "dollar" , 1) ,  ("EUR" , "euro" , 0.9)

//real class for instanciation ,  with constructor .
export class Devise implements IDevise {
   constructor(public code :string = "?" , 
               public nom :string = "?",
               public change :number= 0){
   }
}


