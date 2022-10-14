
import { IDevise , Devise} from '../model/devise';
import { SqDevise, DeviseModelStatic } from '../model/sq-devise';
import { models } from '../model/global-db-model';
import { NotFoundError, ConflictError } from '../apiErrorHandler';

export class SqDeviseService {
  
    deviseModelStatic : DeviseModelStatic = models.devises;

    constructor(){
    }

    //old style callback version (pas conseillée , juste pour Tp cb-->Promise):
    findByIdCb(code: string , cbWithDeviseErr: (obj:Devise|null,err:any)=>void): void {
          this.deviseModelStatic.findByPk(code)
            .then((obj: SqDevise | null) => {
              //returning null by default if not Found
              if(obj!=null)
                  cbWithDeviseErr(obj,null);
              else 
              cbWithDeviseErr(null,new NotFoundError("devise not found with code="+code));
            })
            .catch((error: Error) => { cbWithDeviseErr(null,error);});
  }   

    findById(code: string): Promise<IDevise> {
        return new Promise<IDevise>((resolve: Function, reject: Function) => {
            this.deviseModelStatic.findByPk(code)
              .then((obj: SqDevise | null) => {
                //returning null by default if not Found
                if(obj!=null)
                    resolve(obj);
                else 
                   reject(new NotFoundError("devise not found with code="+code));
              })
              .catch((error: Error) => { reject(error);});
          });
    }   

    findAll(): Promise<IDevise[]> {
        return new Promise((resolve,reject) => {
            this.deviseModelStatic.findAll()
          .then((objects: SqDevise[]) => {
            resolve(objects);
          }).catch((error: Error) => {
            reject(error);
          });
        });
    }

    insert(d: IDevise): Promise<IDevise> {
        return new Promise((resolve,reject) => {
            this.deviseModelStatic.create(<any>d)
            .then((obj: SqDevise) => {
              //console.log("*** after insert, obj:"+JSON.stringify(obj));
              resolve(obj);
            }).catch((error: any) => {
              console.log("err:"+JSON.stringify(error));
              reject(error);
            });
         });
    }

    update(d: IDevise): Promise<IDevise> {
        return new Promise((resolve,reject) => {
            this.deviseModelStatic.update(d, { where: { code : d.code} })
            .then((nbAffectedRows: number | any) => {
              if(nbAffectedRows==1){
               // console.log("*** after update, obj:"+JSON.stringify(e));
                resolve(d);
              }
              else{
                //soit erreur , soit aucun changement !
                reject(new Error("no change or no update"));
              }
            }).catch((error: any) => {
              //console.log("err:"+JSON.stringify(error));
              reject(error);
            });
         });
    }

    saveOrUpdate(d: IDevise): Promise<IDevise> {
      return new Promise((resolve,reject) => {
        //.upsert() is appropriate for saveOrUpdate if no auto_incr
        this.deviseModelStatic.upsert(<any>d)
        .then((ok: any ) => {
          //console.log("*** after insert, obj:"+JSON.stringify(obj));
          resolve(d);
        }).catch((error: any) => {
          console.log("err:"+JSON.stringify(error));
          reject(error);
        });
     });
    }

    deleteById(codeDev: string): Promise<void> {
        return new Promise((resolve,reject) => {
            this.deviseModelStatic.destroy( { where: { code : codeDev} } )
            .then(() => {
              resolve();
            }).catch((error: any) => {
              //console.log("err:"+JSON.stringify(error));
              reject(error);
            });
           });
    }

    async initDataSet(){
      await this.saveOrUpdate( new Devise("USD" , "Dollar" , 1));
      await this.saveOrUpdate( new Devise("EUR" , "Euro" , 0.92));
      await this.saveOrUpdate( new Devise("GBP" , "Livre" , 0.82));
      await this.saveOrUpdate( new Devise("JPY" , "Yen" , 132.02));
    }
   

}