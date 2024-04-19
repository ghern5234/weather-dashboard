const apiKey = '0ddbdd01e0d6ab99523811f618c306be';
const baseUrl = 'https://api.openweathermap.org';
// const searchedEl = document.getElementByID('searched-cities');

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}'


const todayWeather = document.querySelector('#today');
const fiveDayForecast = document.querySelector('#forecast');
const searchHistoryContainer = document.querySelector('#search-history');
const citySearchBtn = document.querySelector('#searchButton');
const searchHistory = [];

//Function to store new searches to the search history to local storage
function appendToHistory(search) {
   //Checks if the search exists in search history, if so it ends the function
    if (searchHistory.indexOf(search) !== -1 ){
        return;
    }
    //Adds new search to search history value
    searchHistory.push(search);
    //Convert search history value to JSON and store to local storage
    localStorage.setItem("search-history", JSON.stringify(searchHistory));


}

//Function to fetch latitude and longitude of searched city
async function geoCoordinates(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0ddbdd01e0d6ab99523811f618c306be`)
    const data = await response.json()
    console.log(data)
    const parsedData = {
        lat: data[0].lat,
        lon: data[0].lon,
    }
    console.log(parsedData);

    todayForcast(parsedData.lat, parsedData.lon)
    
  }
  catch (error){
   console.error("Error fetching data", error)
  }
}



// function init() {
//     const searchedLocations = JSON.parse(localStorage.getItem('search-history'));

//     if (searchedLocations.length === 0) {
//         return;
//     }
    
//     for (const location of searchedLocations) {
//         console.log(location)

//     } 
// };


async function todayForcast(lat, lon) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0ddbdd01e0d6ab99523811f618c306be`)
      const data = await response.json()
      console.log(data)

      var day = dayjs()

      const weatherHtml = `
     <div>
        <h3>${data.name}</h3>
        <p>${day}</p>
        <p>Temp: ${data.main.temp}</p>
        <p>Humidity: </p>
        <p>Wind Speed: </p>
     </div>`
 
     todayWeather.innerHTML = weatherHtml

      
    }
    catch (error){
     console.error("Error fetching data", error)
    }

  }






//Event listener on search button 
citySearchBtn.addEventListener('click', async function(event) {
    console.log('working');
    event.preventDefault();
    const city = document.getElementById("searchInput").value;
    geoCoordinates(city);
    // todayForcast();
    console.log(city);
    // init();
})


// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}