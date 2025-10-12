const apiKey = "60c098771e19dce0553fcd95a611e383";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');


async function UpdateWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404 || response.status === 400) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        var data = await response.json();
        updateTime(data);
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '℃';
        document.querySelector('.feels-like-p').innerHTML = 'Feels like: ' + Math.round(data.main.feels_like) + '℃';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';



        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}


function updateTime(data) {
    const current = data.dt;
    const card = document.querySelector('.card');

    const hour = new Date((current + data.timezone) * 1000).getUTCHours();

    console.log(hour)


    if (hour >= 23 || hour < 5) {
        card.style.background = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
        card.style.color = "#fff";
    } else if (hour >= 5 && hour < 12) {
        card.style.background = 'linear-gradient(135deg, #89f7fe, #66a6ff)';
        card.style.color = "#444";
    } else if (hour >= 12 && hour < 17) {
        card.style.background = 'linear-gradient(135deg, #f7971e, #ffd200)';
        card.style.color = "#444";
    } else if (hour >= 17 && hour < 23) {
        card.style.background = 'linear-gradient(135deg, #00feba, #5b548a)';
        card.style.color = "#fff";
    }
}

searchBtn.addEventListener('click', () => {
    UpdateWeather(searchBox.value);
})

searchBox.addEventListener('input', () => {
    document.querySelector('.error').style.display = "none";
})

searchBox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        UpdateWeather(searchBox.value)
    }
})


