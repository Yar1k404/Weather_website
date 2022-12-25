$('ul li').click(function () {
    $('ul li').removeClass("active");
    $(this).addClass("active");
});

const link = "http://api.weatherstack.com/current?access_key=50087aa334c5c530dbe5a204180a8edf"
const cityName = document.getElementById('cityName')
const temperatureBlock = document.getElementById('temperatureBlock')
const imgBlock = document.getElementById('imgBlock')
const localTime = document.getElementById('localTime')
const windSpeedInfo = document.getElementById('windSpeedInfo')
const humidityInfo = document.getElementById('humidityInfo')
const feelsLikeInfo = document.getElementById('feelsLikeInfo')
const pressureInfo = document.getElementById('pressureInfo')
const visibilityInfo = document.getElementById('visibilityInfo')
const chanceOfRainInfo = document.getElementById('chanceOfRainInfo')

let store = {}
let temporaryCity = localStorage.getItem('city')

const fetchData = async () => {
    const result = await fetch(`${link}&query=${temporaryCity}`)
    const data = await result.json()

    const {
        current: {
            temperature,
            feelslike,
            pressure,
            localtime,
            wind_speed: windSpeed,
            weather_descriptions: descriptions,
            weather_icons: weatherIcons,
            humidity,
            visibility,
        },
    } = data

    store = {
        ...store,
        temperature,
        feelslike,
        pressure,
        localtime,
        windSpeed,
        descriptions: descriptions[0].toLowerCase(),
        weatherIcons: weatherIcons[0].replace("'", "").replace("'", ""),
        humidity,
        visibility,
    }

    cityName.innerHTML = data.location.name

    if (JSON.parse(localStorage.getItem('switchTemperature')) === true) {
        temperatureConvert(data.current.temperature)
    } else {
        temperatureBlock.innerHTML = `${data.current.temperature}°`
    }

    if (JSON.parse(localStorage.getItem('switch')) === true) {
        timeConvert(data.location.localtime.slice(11))
    } else {
        localTime.innerHTML = `Local time: ${data.location.localtime.slice(11)}`
    }

    console.log(data)
    weatherImage(descriptions)
    renderInfo()
}

const weatherImage = () => {
    let value = store.descriptions

    switch (value) {
        case "partly cloudy":
            imgBlock.setAttribute("src", "../img/partly.png")
            break
        case "cloud":
            imgBlock.setAttribute("src", "../img/cloud.png")
            break
        case "clear":
            imgBlock.setAttribute("src", "../img/clear.png")
            break
        case "fog":
            imgBlock.setAttribute("src", "../img/fog.png")
            break
        case "sunny":
            imgBlock.setAttribute("src", "../img/sunny.png")
            break
        case "heavy snow":
            imgBlock.setAttribute("src", "../img/snow.png")
            break
        case "snow":
            imgBlock.setAttribute("src", "../img/snow.png")
            break
        case "light rain":
            imgBlock.setAttribute("src", "../img/light-rain.png")
            break
        case "overcast":
            imgBlock.setAttribute("src", "../img/overcast.png")
            break
        case "moderate rain":
            imgBlock.setAttribute("src", "../img/rain.png")
            break
        default:
            imgBlock.setAttribute("src", store.weatherIcons)
            break
    }
}

const renderInfo = () => {
    windSpeedInfo.innerHTML = `${store.windSpeed} km/h`
    humidityInfo.innerHTML = `${store.humidity} %`
    feelsLikeInfo.innerHTML = `${store.feelslike} °`
    pressureInfo.innerHTML = `${store.pressure} hPa`
    visibilityInfo.innerHTML = `${store.visibility} km`

    if (store.humidity <= 10) {
        chanceOfRainInfo.innerHTML = "0%"
    } else if (store.humidity <= 30) {
        chanceOfRainInfo.innerHTML = "15%"
    } else if (store.humidity <= 50) {
        chanceOfRainInfo.innerHTML = "25%"
    } else if (store.humidity <= 70) {
        chanceOfRainInfo.innerHTML = "50%"
    } else if (store.humidity <= 90) {
        chanceOfRainInfo.innerHTML = "85%"
    } else if (store.humidity <= 100) {
        chanceOfRainInfo.innerHTML = "100%"
    }
}

document.addEventListener('keydown', (ev) => {
    if (ev.code === 'Enter') {
        let cityInput = document.getElementById('cityInput').value
        temporaryCity = cityInput
        localStorage.setItem('city', temporaryCity)
        fetchData()
    }
})

const timeConvert = (time) => {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    localTime.innerHTML = `Local time: ${time.join('')}`  // return adjusted time or original string
}

const temperatureConvert = (temperature) => {
    temperature += (temperature * 9 / 5) + 32

    temperatureBlock.innerHTML = `${temperature} °F`
}

fetchData()
