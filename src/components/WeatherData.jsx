import { Component } from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherData.css"

class WeatherData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            city: "Toronto", // set as default city as we are in Toronto
            cityInput: "",
            baseUrl: "https://api.openweathermap.org/data/2.5/",
            todayWeatherData: {},
        }
    }

    componentDidMount() {
        this.getWeather(this.state.city)
    }

    // on event of input change
    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.getWeather(this.props.city)
        }
    }


    getWeather = async (city) => {

        try{
            // get weekly weather of the city
            const todayWeatherResponse = await axios.get(`${this.state.baseUrl}forecast?q=${city}&cnt=${7}&appid=${process.env.REACT_APP_API_KEY}`);
            this.setState({todayWeatherData: todayWeatherResponse.data});
            // console.log(todayWeatherResponse.data);
        }catch(error){
            console.log(error);
        }

    }
    
    handleInputChange = (e) => {
        this.setState({ cityInput: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ city: this.state.cityInput }, () => {
            // Trigger the getWeather method with the updated city
            this.getWeather(this.state.city);
        });
    };

    render() {
        const {todayWeatherData} = this.state;
    
        return (
            <div className="app-wrapper">
                <form onSubmit={this.handleSubmit}>
                    {/* Input component to update the city */}
                    <input
                        className="city-input"
                        type="text"
                        name="City"
                        id="City"
                        placeholder="Enter a city"
                        value={this.cityInput}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" value="Submit" className="btn"/>
                </form>

                {/* Weather display */}
                {Object.keys(todayWeatherData).length === 0 ? (
                <div className="forecast">
                    <div className="current-forecast-card">
                    <div className="card-body">
                        <h5>City not found</h5>
                    </div>
                    </div>
                </div>
                ) : (
                    <WeatherDisplay today={todayWeatherData} />
                )}
            </div>
        );
      }
}


export default WeatherData;