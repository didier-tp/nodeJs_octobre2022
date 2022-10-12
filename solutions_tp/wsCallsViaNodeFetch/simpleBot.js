
import fetch from 'node-fetch';
import townDao from './town-dao-mongoose.js';

var villesAvecMeteo = [
    {
        name : 'Paris',
        zip : '75001',
        lat:null,
        lon:null,
        weather_description:null,
        temperature : null
    },
    {
        name : 'Bordeaux',
        zip : '33000',
        lat:null,
        lon:null,
        weather_description:null,
        temperature : null
    },
    {
        name : 'Nice',
        zip : '06000',
        lat:null,
        lon:null,
        weather_description:null,
        temperature : null
    },
    {
        name : 'Lyon',
        zip : '69001',
        lat:null,
        lon:null,
        weather_description:null,
        temperature : null
    },
    {
        name : 'Strasbourg',
        zip : '67000',
        lat:null,
        lon:null,
        weather_description:null,
        temperature : null
    }
];
/*
//but du tp :
phase 1 :
   - trouver les informations manquante en appelant en boucle
   les API REST
      http://api.zippopotam.us/fr (lon et lat selon zip)
      https://api.openweathermap.org (weather selon lon et lat)

phase 2 :
   - stocker cela dans une base mongoDB

phase 3 :
   - déclenchement périodique (toutes les 6h)   
*/

async function retreiveLonAndLatFromZip(town){
    let wsUrl = `http://api.zippopotam.us/fr/${town.zip}`;
    /*
    {"post code": "75001", "country": "France", 
    "country abbreviation": "FR", 
    "places": [{"place name": "Paris 01 Louvre", "longitude": "2.3417",
     "state": "\u00cele-de-France", "state abbreviation": "A8", 
     "latitude": "48.8592"}]}
     */
    try{
      const response  = await fetch(wsUrl);
      //console.log("response.status : ", + response.status);
      if(response.ok){
        let data  = await response.json();
        //console.log("response data : " + JSON.stringify(data));
        if(data && data.places[0]){
            town.lat = data.places[0].latitude;
            town.lon = data.places[0].longitude;
        }
      }else{
       let text  = await response.text();
       console.log("error response text : " + text);
      }
      return town;
    }catch(ex){
      console.log("ex : " + ex);
      throw ex;
    }
}

async function retreiveCurrentWheaterFromLonAndLat(town){
/*
  https://openweathermap.org/current
  API-KEY=27a68278aebee75af9d4fc23d7a68f75
  for account(didierDefrance, didier@d-defrance.fr , .....2.)
  */
  let apiKey = "27a68278aebee75af9d4fc23d7a68f75";
  let lat = town.lat
  let lon = town.lon
  let  wsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}` 
  
    /*
    //type de réponse attendue:
  /*
  {
  ...
  "weather": [
    {
     ...
      "description": "clear sky",
     ...
    }
  ],
  "main": {
    "temp": 282.55,
    ....
  },
  ....
  } 
  */
  
    try{
      const response  = await fetch(wsUrl);
      //console.log("response.status : ", + response.status);
      if(response.ok){
        let data  = await response.json();
        //console.log("response data : " + JSON.stringify(data));
        if(data){
            if(data.weather[0] && data.weather[0].description ){
                town.weather_description = data.weather[0].description;
            }
            if(data.main && data.main.temp ){
                town.temperature = (data.main.temp -273.15).toFixed(2);//kelvin to celsius degree
            }
        }
      }else{
       let text  = await response.text();
       console.log("error response text : " + text);
      }
      return town;
    }catch(ex){
      console.log("ex : " + ex);
      throw ex;
    }
}

async function storeTownInLocalMeteoMongoDataBase(town){
  let criteria={ name: town.name };
  let existingTownsInDb = await townDao.findByCriteria(criteria);
  if(existingTownsInDb && existingTownsInDb.length > 0){
    let newValueOfTownToUpdate = town;
    newValueOfTownToUpdate.id = existingTownsInDb[0].id;
    let updatedTown = await townDao.updateOne(newValueOfTownToUpdate);
    return updatedTown;
  }else {
  let savedTown = await townDao.save(town);
  return savedTown;
  }
}

async function retreiveInfos(){
    for(let [i,v] of villesAvecMeteo.entries()){
       await retreiveLonAndLatFromZip(v);
       await retreiveCurrentWheaterFromLonAndLat(v);
       villesAvecMeteo[i] = await storeTownInLocalMeteoMongoDataBase(v);
    }
    console.log("villesAvecMeteo="+ JSON.stringify(villesAvecMeteo));
}
retreiveInfos();



//idee pour phase 3 (déclenchement périodique):
var intervaleDeTemps = 5000 ; //5000ms = 5s
//pour 1h , intervaleDeTemps = 1000 * 60 * 60  
var compteur=0;

//coder une fonction qui sera appelée toutes les 5s (5000ms) et qui va incrementer et afficher le
//compteur. Lorsque le compteur aura atteint la valeur 10 on arrete le traitement périodique
// via un appel à clearInterval(traitementPeriodique)
function codeDeclenchePeriodiquement(){
  compteur++;
  console.log("compteur="+compteur);
  if(compteur==10){
    { clearInterval(traitementPeriodique); process.exit();}
  }
}
var traitementPeriodique = setInterval(codeDeclenchePeriodiquement, intervaleDeTemps);

