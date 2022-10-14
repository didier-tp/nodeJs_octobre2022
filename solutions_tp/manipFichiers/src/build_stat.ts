import fs from 'fs/promises'; //with npm install --save-dev @types/node
import readLine from 'node:readline';

async function buildStatFromProduits(){
    try{
        let stat = { min : 9999999999 , max : -99999999999 , sum : 0 , average : 0};
        let fileProduits = await fs.open('produits.csv', 'r');
        let nbLignes = 0;
        let rl = readLine.createInterface({
            input : fileProduits.createReadStream(),
            output : process.stdout,
            terminal : false
        });
        rl.on('line', function (lineText) {
            console.log("line="+lineText);
            if(lineText && !lineText.startsWith("#")){
                nbLignes++;
                let prix= Number(lineText.split(";")[2]);
                if(prix > stat.max ) stat.max= prix;
                if(prix < stat.min ) stat.min= prix;
                stat.sum = stat.sum + prix;
            }
           });
        rl.on('close', async function () {
            stat.average = stat.sum / nbLignes;
            console.log(`nbLignes=${nbLignes} stat=${JSON.stringify(stat)}`)
            await fs.writeFile('stats.json', JSON.stringify(stat));
            console.log("stats.json généré ou remplacé")
           });
       
    }catch(err){
      console.error("err="+err);
    }
  }
  buildStatFromProduits();