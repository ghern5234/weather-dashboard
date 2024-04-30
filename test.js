class WeatherCard {
    constructor(day, temp, humidity, windSpeed) {
        this.day = day;
        this.temp = temp;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
      async renderToday(){ 
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
      async renderFiveDay(){
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

      formatDate(date) {
        return dayjs(date.split(" ")[0]).format('DD/MM/YYYY')
      }
    }
const today = new WeatherCard(userAnswers)

// funcitonrenderCard(data){
//     const todayForcast = new WeatherCard(data.day, data.temp, data.humidity, data.windSpeed);


// }
