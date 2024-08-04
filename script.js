const fetchButton = document.getElementById('fetch-data');

let lat;
let long;

fetchButton.addEventListener('click', async () => {
    function getPosition() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(position),
                );
            } else {
                reject("Unable to retrieve your location");
            }
        });
    }


    
    getPosition()
        .then((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat, long);
            window.localStorage.setItem('latetude', lat);
            window.localStorage.setItem('longtitude', long);
            
            window.location.href = 'main.html';
          
        })
        .catch((error) => {
            alert(error);
        });
    
});






