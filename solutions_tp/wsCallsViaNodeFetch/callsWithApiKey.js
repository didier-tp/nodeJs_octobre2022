import fetch from 'node-fetch';



async function callWithApiKeyInUrlForChanges(){
  let apiKey = "26ca93ee7fc19cbe0a423aaa27cab235";//ici avec apiKey de didier
  let  wsUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}` 
	
	//type de réponse attendue:
	/*
	{"success":true,"timestamp":1635959583,"base":"EUR","date":"2021-11-03",
	"rates":{"AED":4.254663,"AFN":105.467869,..., "EUR":1 , ...}}
	*/
    try{
       const response  = await fetch(wsUrl);
	   console.log("\n http://data.fixer.io/api/latest response:");
       console.log("response.status : ", + response.status);
       console.log("response data : " + JSON.stringify(await response.json()));
    }catch(ex){
      console.log("ex : " + ex);
    }
}

async function callWithApiKeyInUrlForMovies(){
/*
https://developers.themoviedb.org/3/getting-started/introduction
https://www.themoviedb.org/settings/api/request (url pour demander api key)
API-KEY=861b3deeac81ccfcadd33282456a499c
for account(didierdefrance, didier@d-defrance.fr , .....2.)
*/
  let apiKey = "861b3deeac81ccfcadd33282456a499c";
  let  wsUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}` 
  //autre exemple d'url : `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`
  //et ....movie?q...=cinquieme+element&api_key=....

//type de réponse attendue:
/*
{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},
{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},
{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},
{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},
{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},
{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},
{"id":37,"name":"Western"}]}
*/
  try{
     const response  = await fetch(wsUrl);
   console.log("\n https://api.themoviedb.org/3/genre/movie/list response:", + response.status);
     console.log("response.status : ", + response.status);
     //console.log("response data : " + JSON.stringify(await response.json()));
     let responseData = await response.json();
     for(let genreIndex in responseData.genres ){
        subCallDicoverMoviesByGenre(
              responseData.genres[genreIndex].id,
              responseData.genres[genreIndex].name);
     }

  }catch(ex){
    console.log("ex : " + ex);
  }
}

async function subCallDicoverMoviesByGenre(genreId,genreName){
  let year=2022;
  let apiKey = "861b3deeac81ccfcadd33282456a499c";
  let  wsUrl = `https://api.themoviedb.org/3/discover/movie?year=${year}&with_genres=${genreId}&api_key=${apiKey}` 
  try{
    const response  = await fetch(wsUrl);
  console.log("\n list of movies for year=2022&with_genres="+genreName);
    //console.log(JSON.stringify(await response.json()));
    let responseData = await response.json();
    for(let i in responseData.results ){
      console.log(responseData.results[i].original_title);
   }
 }catch(ex){
   console.log("ex : " + ex);
 }
}


async function callWithApiKeyInUrlForWheather(){
  /*
  https://openweathermap.org/current
  API-KEY=27a68278aebee75af9d4fc23d7a68f75
  for account(didierDefrance, didier@d-defrance.fr , .....2.)
  */
    let apiKey = "27a68278aebee75af9d4fc23d7a68f75";
    let lat = 48.856614;//latitude (ici de Paris)
    let lon = 2.3522219;//longitude (ici de Paris)
    let  wsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}` 
    
  //type de réponse attendue:
  /*
  {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  } 
  */
    try{
       const response  =  await fetch(wsUrl);
       console.log("\n https://api.openweathermap.org response:");
       console.log("response.status : ", + response.status);
       console.log("response data : " + JSON.stringify(await response.json()));
    }catch(ex){
      console.log("ex : " + ex);
    }
  }

  async function callWithApiKeyInHeaderForXyz(){
      let apiKey = "abcdef"; //à adapter
      let  wsUrl = `http://api.xyz`  // à adapter
    
      try{
         const response  = 
         await fetch(wsUrl ,
            {
            headers: {
              'X-API-KEY': `${apiKey}`
            }
          });
         console.log("\n http://api.xyz response:");
         console.log("response.status : ", + response.status);
         console.log("response data : " + JSON.stringify(await response.json()));
      }catch(ex){
        console.log("ex : " + ex);
      }
    }

//callWithApiKeyInUrlForChanges();
//callWithApiKeyInUrlForMovies();
callWithApiKeyInUrlForWheather();
//callWithApiKeyInHeaderForXyz();
