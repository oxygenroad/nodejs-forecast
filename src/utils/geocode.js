const request = require ('request')

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress +'.json?access_token=pk.eyJ1IjoibW9oaXMiLCJhIjoiY2toY2lxemw1MGE2aTJzbWtuNHZkM25neCJ9.OvLOLJ2wo7sCOpRWhjHXTw'
    request({ url  , json : true}, (error,response)=>{
 
     if(error){//this massage get sending back to the caller 
       callback('error network problem ', undefined)
 
     }else if (response.body.features.length===0){
       callback('city not found ' , undefined)
  
     }else  { 
       callback(undefined,{
         latitude : response.body.features[0].center[1] ,
         longitude : response.body.features[0].center[0] , 
         location : response.body.features[0].place_name 
 
       })
      
     } 
    } )
    
  }
 
 

  module.exports = geocode 