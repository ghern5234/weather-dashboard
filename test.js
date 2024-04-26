class WeatherCard {
    constructor(day, temp, humidity, windSpeed) {
        this.day = day;
        this.temp = temp;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
    
        
    }

WeatherCard.prototype.renderCard = function(data) {
    const todayForcast = new WeatherCard(data.day, data.temp, data.humidity, data.windSpeed);
}

funcitonrenderCard(data){
    const todayForcast = new WeatherCard(data.day, data.temp, data.humidity, data.windSpeed);


}
