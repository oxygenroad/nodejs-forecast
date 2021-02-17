const request = require ('request')

const forecast = (latitude,longitude , callback )=>{
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      qs: {
       // q: 'London,uk',
        lat: latitude,
        lon: longitude,
        //callback: 'weather',
        id: '2172797',
        lang: 'null',
        units: "metric" , // or "imperial"',
       // mode: 'json'
      },
      headers: {
        'x-rapidapi-key': '4980fe1717mshdf029fac1769adcp10aac6jsn9585735eb3d9',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
       // useQueryString: true
      },
     json : true 
    };
    request(options, function (error, response, body) {
      if (error){
        callback('error network problem ', undefined)
      } else if  (response.body.cod=== '404') {
        callback('error is ' +body.message  , undefined)
      } else {
        callback(undefined,body)
      }
  
  
    })
  
  
  }

  module.exports = forecast