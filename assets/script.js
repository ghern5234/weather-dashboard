const APIKey = '0ddbdd01e0d6ab99523811f618c306be';
const searchedEl = document.getElementByID('searched-cities');
const todayWeather = document.querySelector('#today');
const searchHistory = document.querySelector('#searched cities')
const fiveDayForecast = document.querySelector('#forecast')

function init() {
    const searchedLocations = JSON.parse(localStorage.getItems('locations'));

    if (searchedLocations.length === 0) {
        return;
    }
    
    for (const location of searchedLocations) {

    } 
};

init();




// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}