const apiKey = '0ddbdd01e0d6ab99523811f618c306be';
const baseUrl = 'https://api.openweathermap.org';
// const searchedEl = document.getElementByID('searched-cities');



const todayWeather = document.querySelector('#today');
const fiveDayForecast = document.querySelector('#forecast');
const searchHistoryContainer = document.querySelector('#search-history');
const citySearchBtn = document.querySelector('#searchButton');
const searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

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
    renderSearchHistory();


}

//Function to fetch latitude and longitude of searched city
async function geoCoordinates(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0ddbdd01e0d6ab99523811f618c306be&`)
    const data = await response.json()
    console.log(data)
    const parsedData = {
        lat: data[0].lat,
        lon: data[0].lon,
    }
    console.log(parsedData);

    todayForcast(parsedData.lat, parsedData.lon)
    fiveForecast(parsedData.lat, parsedData.lon)
    
  }
  catch (error){
   console.error("Error fetching data", error)
  }
}



function init() {
    const searchedLocations = JSON.parse(localStorage.getItem('search-history'));

    if (searchedLocations.length === 0) {
        return;
    }
    
    for (const location of searchedLocations) {
        console.log(location)

    } 
};

//Function to fetch and render today forecast
async function todayForcast(lat, lon) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0ddbdd01e0d6ab99523811f618c306be&units=imperial`)
      const data = await response.json()
      console.log(data)

      var day = dayjs().format('DD/MM/YYYY')
      var icon = data.weather[0].icon;
      const url = `https://openweathermap.org/img/wn/${icon}.png`

      const weatherHtml = `
     <div class="border-solid border-4 border-gray-600 p-6 rounded-md">
        <h3 class="text-lg">${data.name}</h3>
        <p>(${day})</p>
        <p>Temp: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%rh</p>
        <p>Wind Speed: ${data.wind.speed}mph</p>
        <img class="object-center" src="${url}"/>
     </div>`
 
     todayWeather.innerHTML += weatherHtml
     todayWeather.classList.add("today-class") 


      
    }
    catch (error){
     console.error("Error fetching data", error)
    }

  }

//Function to fetch and render five day forecast
async function fiveForecast(lat, lon) {
  try {const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0ddbdd01e0d6ab99523811f618c306be&units=imperial`)
  const data = await response.json();
  console.log(data);

  // const filteredArray = data.list.filter((day) => day.dt_txt.includes("12:00:00"))
  //       console.log(filteredArray)

  const filteredArray = [];


  for(let day of data.list){
    if (day.dt_txt.includes("12:00:00")){
      const card = fiveDayCard(day)
      fiveDayForecast.innerHTML += card;
    }
  }
  
}
catch (error){
  console.error("Error fething the data", error)
}
}

//Function to render fiveday forecast cards
function fiveDayCard(day){
  var icon = day.weather[0].icon;
  const url = `https://openweathermap.org/img/wn/${icon}.png`
  console.log(day)
  return `<div class="border-solid border-4 border-gray-600 p-6 rounded-md">
     <p>(${formatDate(day.dt_txt)})</p>
     <p>Temp: ${day.main.temp}°F</p>
     <p>Humidity: ${day.main.humidity}%rh</p>
     <p>Wind Speed: ${day.wind.speed}mph</p>
     <img src="${url}"/>
  </div>`
 }


//Function to format date
function formatDate(date) {
  return dayjs(date.split(" ")[0]).format('DD/MM/YYYY')
}


//Function to render search history
function renderSearchHistory(searchHistory) {
  


  for(search of searchHistory){
    localStorage.getItem("search-history", )
    
    const searchHistoryHtml= `
    <div></div>
    ` 

  }

}




//Event listener on search button 
citySearchBtn.addEventListener('click', async function(event) {
    console.log('working');
    event.preventDefault();
    const city = document.getElementById("searchInput").value;
    geoCoordinates(city);
    appendToHistory(city);
    console.log(city);
    // init();
})


// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}