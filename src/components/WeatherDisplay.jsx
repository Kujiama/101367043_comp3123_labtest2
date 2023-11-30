import "./WeatherDisplay.css"

function getDayOfWeek(time) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(time * 1000); // Convert timestamp to milliseconds
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}

function getHour(timestamp) {
    const date = new Date(timestamp * 1000);
    const hour = date.getHours();
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}


function WeatherDisplay({today}) {
    const location = `${today.city.name}, ${today.city.country}`;
    const currentDay = today.list[0];
    const restofDay = today.list.slice(1);
  

    return (
        <div className="forecast">
            <div className="current-forecast-card">
                <div className="card-body left">
                    {/* Current Day */}
                    <h3>{getDayOfWeek(currentDay.dt)} {getHour(currentDay.dt)}</h3>
                    <h3>{location}</h3>
                    <img src={`https://openweathermap.org/img/wn/${currentDay.weather[0].icon}.png`} width={120} alt="Weather Icon" />
                    <p className="card-text">{currentDay.weather[0].description}</p>
                </div>

                <div className="card-body right">
                    <h2 className="card-text">Current Temperature: {Math.round(currentDay.main.temp - 273.15)}&deg;C</h2>
                    <h3>Humidity: {currentDay.main.humidity}%</h3>
                    <h3>Wind Speed: {currentDay.wind.speed} m/s</h3>
                    <h3>Feels Like: {Math.round(currentDay.main.feels_like - 273.15)}&deg;C</h3>
                </div>
            </div>

            <div className="hourly-forecast-card">
                {restofDay.map((hour, index) => (
                        <div className="hourly-weather" key={index}>
                            <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} width={80} height={80} alt="Weather Icon" />
                            <h4>{getHour(hour.dt)}</h4>
                            <p>{Math.round(hour.main.temp - 273.15)}&deg;C</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
  
export default WeatherDisplay;
