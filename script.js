document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-data');
    window.sessionStorage.removeItem('latitude');
    window.sessionStorage.removeItem('longitude');


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
           let lat = position.coords.latitude;
           let long = position.coords.longitude;
            console.log(lat, long);
            window.sessionStorage.setItem('latetude', lat);
            window.sessionStorage.setItem('longtitude', long);
            
            window.location.href = 'main.html';
          
        })
        .catch((error) => {
            alert(error);
        });
    
});

})
