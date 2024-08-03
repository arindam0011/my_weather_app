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
                reject("Geolocation is not supported by this browser.");
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
            console.log(error);
        });
    
});






