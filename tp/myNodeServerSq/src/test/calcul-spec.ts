import chai from 'chai'; //npm install --save-dev chai
                         //npm install --save-dev @types/chai 
                         //npm install --save-dev mocha
                         //npm install --save-dev @types/mocha

import { carre } from '../calcul' ;

const expect = chai.expect;

describe("tests de calculs" ,()=>{

    it("converts the basic colors", () =>{
       const resCarre = carre(5);
       expect(resCarre).to.equal(25);
    });

})