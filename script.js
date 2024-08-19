const apiKey = 'accb879753b3c8d87c410e6a6b5535f3'

const form = document.querySelector('#weatherForm')

const cityField = document.querySelector('#cityField')
const tempField = document.querySelector('#tempField')
const feelsLikeField = document.querySelector('#feelsLikeField')
const tempMinMaxField = document.querySelector('#tempMinMax')
const humidityField = document.querySelector('#humidity')
const descField = document.querySelector('#desc')
const iconField = document.querySelector('#iconField')

form.addEventListener('submit',async (e) => {
    e.preventDefault()

    const cityName = form.querySelector('#cityInput').value

    if(cityName == ""){
        alert('Please enter a city name')
    }else{
        const data = await getWeatherData(cityName)
        displayData(data)
    }
})

async function getWeatherData(city){
    try{
        let apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        
        let response = await fetch(apiCall)
        if(!response.ok){
            throw new Error('Error fetching data,try again letter')
        }
        const latLonData = await response.json()
        

        if(latLonData == []){
            throw new Error('Fetched data empty,Try again letter')
        }else{
            apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latLonData[0].lat}&lon=${latLonData[0].lon}&appid=${apiKey}`
            
            response = await fetch(apiCall)
            if(!response.ok){
                throw new Error('Error fetching data,try again letter')
            }
            const weatherData = await response.json()

            if(weatherData == {}){
                throw new Error('Fetched data empty,try again letter')
            }

            return weatherData
        }
    }catch(e){
        alert(e)
    }
}

function displayData(data){
    const tempC = Math.round(data.main.temp - 273)
    const feelsLike = Math.round(data.main.feels_like - 273)
    const tempMin = Math.round(data.main.temp_min - 273)
    const tempMax = Math.round(data.main.temp_max - 273)
    const cityName = data.name
    console.log(data);

    cityField.innerHTML = cityName
    tempField.innerHTML = `Temp: ${tempC}°C`
    feelsLikeField.innerHTML = `Feels Like: ${feelsLike}°C`
    tempMinMaxField.innerHTML = `Min: ${tempMin}°C Max: ${tempMax}°C`
    humidityField.innerHTML = `Humidity: ${data.main.humidity}%`
    descField.innerHTML = data.weather[0].description
    iconField.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    
}