// Inital Data
navigator.geolocation.getCurrentPosition(position => {
    searchClimate(position.coords.latitude, position.coords.longitude)
})
const key = `e4dff93e` // Caso apareça undefined é só trocar a key

const baseUrl = `https://api.hgbrasil.com/weather?format=json-cors&key=${key}`

const submit = document.querySelector('[wm-submit]')

// Events
submit.onclick = function (event) {
    event.preventDefault()
    const form = event.target.parentNode
    const city = form.city.value
    searchCityName(city.toLowerCase())
}

// Function
function insertInHTML(json) {
    $('#titulo').html(`${json.results.city}`)
    $('#graus').html(`${json.results.temp}°C`)


    $('#max-01').html(`${json.results.forecast[1].max}°C`)
    $('#max-02').html(`${json.results.forecast[2].max}°C`)
    $('#max-03').html(`${json.results.forecast[3].max}°C`)
    $('#max-04').html(`${json.results.forecast[4].max}°C`)
    $('#max-05').html(`${json.results.forecast[5].max}°C`)


    $('#day-01').html(`${json.results.forecast[1].weekday}`)
    $('#day-02').html(`${json.results.forecast[2].weekday}`)
    $('#day-03').html(`${json.results.forecast[3].weekday}`)
    $('#day-04').html(`${json.results.forecast[4].weekday}`)
    $('#day-05').html(`${json.results.forecast[5].weekday}`)

    $('#humidity').html(` ${json.results.humidity}%`)

    updateImage(json)
    updateIcon(json)
}

function updateIcon(json) {
    let icon = document.querySelectorAll('.icon');
    for (let i = 0; i < icon.length; i++) {
        if (json.results.forecast[i].condition == "rain") {
            icon[i].setAttribute("src", "./assets/img/iconrain.png");
        } else  {
            icon[i].setAttribute("src", "./assets/img/iconsol.png");
        }
    }
}

function updateImage(json) {
    const img = document.querySelector('#tempo')
    if (json.results.forecast[0].condition == "rain") {
        img.setAttribute('src', './assets/img/rain.png')
    } else {
        img.setAttribute('src', './assets/img/sol.png')
    }
}

function searchClimate(latitude, longitude) {
    const url = `${baseUrl}&lat=${latitude}&lon=${longitude}&user_ip=remote`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            insertInHTML(json)
            document.querySelector('.fa-tint').style.display = 'block'
        })
        .catch(err => console.log('Problemas na busca dos dados: ', err))
}

function searchCityName(name) {
    const baseCityUrl = `${baseUrl}&city_name=${encodeURI(name)}`

    fetch(baseCityUrl)
        .then(res => res.json())
        .then(json => {
            insertInHTML(json)
            document.querySelector('.fa-tint').style.display = 'block'  
        })
        .catch(err => console.log('Problemas na busca dos dados: ', err))
}


