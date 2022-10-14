import chai from 'chai'; 
import { IDevise, Devise } from '../model/devise';
import { SqDeviseService } from '../dao/sqDeviseService';
import { initSequelize } from '../model/global-db-model'

const expect = chai.expect;

describe("tests de recup devises en database" ,()=>{

    var  deviseService = new SqDeviseService();

    it("devise de code EUR a le nom euro",async () =>{
        initSequelize();
        await deviseService.initDataSet();
        const deviseSource = await deviseService.findById("EUR");
        expect(deviseSource.nom).to.equal("Euro");
    });

})