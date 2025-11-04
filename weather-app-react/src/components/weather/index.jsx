import { useEffect, useState } from "react";
import Search from "../search";


export default function Weather() {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null)
    
    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=60c098771e19dce0553fcd95a611e383`)

            const data = await response.json();

            console.log(data);
            if (data) {
                setLoading(false);
                setWeatherData(data);
            }
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }
        
    }

    function handleSearch() {
        if (search === '') {
            return
        } else {
            fetchWeatherData(search)

        }
        
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-ca', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    useEffect(() => {
        
        fetchWeatherData('winnipeg')
    },[])

    
    return <div>
        <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />

        {
            loading ? <div> Loading </div> : 
                <div>
                    <div className="cityName">
                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{weatherData?.main?.temp}</div>
                    <p className="description">
                        {weatherData && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                    </p>
                    <div className="weatherInfo">
                        <div className="column">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
            </div>
            
        }
    </div>
}