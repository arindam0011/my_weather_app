let latitude=window.localStorage.getItem('latetude');
let longitude=window.localStorage.getItem('longtitude');

let mapIframe=document.getElementById('G-map');
mapIframe.src=`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;

let lat=document.getElementById('lat');
let long=document.getElementById('long');

lat.innerText+=` ${latitude}`;

long.innerText+=` ${longitude}`;


 fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&APPID=7c1395001860d0592ae523653f49e8f3`)
.then((responce)=>{
    if(!responce.ok){
        throw new Error('something went wrong');
    }
    return responce.json();
})
.then((data)=>{
    console.log(data);
    let utc=getTimeZone(data.timezone_offset);
    console.log(utc);
    
    let User_location = document.getElementById('User-location');
        let windSpeed = document.getElementById('windSpeed');
        let humidity = document.getElementById('humidity');
        let Time_zone = document.getElementById('Time-zone');
        let pressure = document.getElementById('pressure');
        let wind_derection = document.getElementById('wind-derection');
        let UV_index = document.getElementById('UV-index');
        let feels_like = document.getElementById('feels-like');

        User_location.innerText += ` ${data.timezone}`;
        windSpeed.innerText += ` ${(data.current.wind_speed*3.6).toFixed(2)} km/h`;
        humidity.innerText += ` ${data.current.humidity}`;
        Time_zone.innerText += ` UTC${utc}`;
        pressure.innerText += ` ${(data.current.pressure/1013.25).toFixed(2)} atm`;
        wind_derection.innerText += ` ${getWindDirection(data.current.wind_deg)}`;
        UV_index.innerText += ` ${data.current.uvi}`; 
        feels_like.innerText += ` ${(parseInt(data.current.feels_like)-273.15).toFixed(2)} °C`;
})
.catch((error)=>{
    console.log(error);
});


function getTimeZone(seconds) {
      let data = parseInt(seconds, 10);
    
      let absHours = Math.floor(Math.abs(data) / 3600);
      let absMinutes = Math.floor((Math.abs(data) % 3600) / 60);

      let sign = data >= 0 ? '+' : '-';
      
      let hoursFormatted = absHours.toString().padStart(2, '0');
      let minutesFormatted = absMinutes.toString().padStart(2, '0');
      
      let timezone = `${sign}${hoursFormatted}:${minutesFormatted}`;
      
      return timezone;
}

// 0° or 360°: North
// 45°: Northeast
// 90°: East
// 135°: Southeast
// 180°: South
// 225°: Southwest
// 270°: West
// 315°: Northwest


function getWindDirection(degrees) {
    if (degrees === 0 || degrees === 360) {
        return 'North';
    }
    else if(degrees>0 && degrees<=90){
        if(degrees==90){
            return 'East';
        }
        return 'North-East';
    }
    else if(degrees>90 && degrees<=180){
        if(degrees==180){
            return 'South';
        }
        return 'South-East';
    }
    else if(degrees>180 && degrees<=270){
        if(degrees==270){
            return 'West';
        }
        return 'South-West';
    }
    else if(degrees>270 && degrees<360){
        return 'North-West';
    }
    
}