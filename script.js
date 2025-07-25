document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=c8fc48d7e4dfbbcc24c941b840432097&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg,
            description: json.weather[0].description,
            humidity: json.main.humidity
            }
            ) 
        } else {
            clearInfo()
            showWarning(`A cidade "${input}" não foi encontrada. Codigo do erro: ${json.cod}`)
        }
        console.log(json.name)
        console.log(json.sys.country)
        console.log(json.main.temp)

        
    }
})

function showInfo(json) {
    showWarning('')

    document.querySelector('.resultado').style.display = 'block'
    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} °C`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} km/h` 
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.iconInfo').innerHTML = `${capitalize(json.description)}`
    document.querySelector('.humidityInfo').innerHTML = `${json.humidity}%`


}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}
function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}