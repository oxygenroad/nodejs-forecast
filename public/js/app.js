//const { response } = require("express")

console.log('Client side javascript file is loaded!')

const weatherform = document.querySelector('form')
const search =document.querySelector('input')
const massage1=document.querySelector('#massage-1')
const massage2=document.querySelector('#massage-2')

//massage2.textContent='java script massage'

weatherform.addEventListener('submit',(e)=>{
e.preventDefault()
const location = search.value 


fetch ('http://localhost:3000/weather?adress='+location).then((response )=>{
    response.json().then((data)=>{
       
        if(data.error){
            massage1.textContent='error : cant find location'
            //console.log()

        } else {
           // const stringData = JSON.stringify(data);
            massage1.textContent= data.location
            massage2.textContent ='tempurter is: ' + data.weather.temp +' it feels like : '+ data.weather.feels_like

            //console.log(data)
        }
        

    })
}) 
console.log(location)
})
///ijhvjh