// universal variables
var weatherDiv = document.getElementById('weather')
var form = document.querySelector('form')

//submit
form.onsubmit = function(e){
    e.preventDefault()
    var searchTerm = this.search.value
    if (!searchTerm) return
    form.search.value = ""
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=c2b712e4ee8e813074537191b2833cce")
    .then(function(res) {
        if(res.status !== 200){
            throw new Error('Location not found')
        }
        return res.json()
    })
    .then(function(data){
        weatherDiv.innerHTML = ""
        console.log(data)
        //city name
        var h2 = document.createElement('h2')
        h2.textContent = data.name + "," + " " + data.sys.country
        weatherDiv.appendChild(h2)
        //map
        var latitude = data.coord.lat
        var longitude = data.coord.lon
        var mapLink = document.createElement('a')
        mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude
        mapLink.textContent = "click to view map"
        weatherDiv.appendChild(mapLink)
        //icon
        var img = document.createElement('img')
        img.src = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png'
        img.alt = data.name
        weatherDiv.appendChild(img)
        //Weather Condition
        var weatherCondition = document.createElement('p')
        weatherCondition.textContent = data.weather[0].description.toUpperCase()
        weatherDiv.appendChild(weatherCondition)
        //Current Temp
        var currentTemp = document.createElement('p')
        currentTemp.textContent = "Current:" + " " + data.main.temp + "°" + " "+ "F"
        weatherDiv.appendChild(currentTemp)
        //Feels Like
        var feelsLike = document.createElement('p')
        feelsLike.textContent = "Current:" + " " + data.main.feels_like + "°" + " "+ "F"
        weatherDiv.appendChild(feelsLike)
        //Last Updated
        var ms = data.dt * 1000
        var date = new Date(ms)
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        var lastUpdated = document.createElement('p')
        lastUpdated.textContent = timeString
        weatherDiv.appendChild(lastUpdated)
    })
    .catch(function(err){
        weatherDiv.innerHTML = err.message
    })
}

