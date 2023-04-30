

let API_KEY = "eb89bfd4e1a3ad4a390cd4c603beb38e";


const getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
  const weatherPromise  = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  })
}


const searchCity = () => {
  const city =  document.querySelector(".city-input").value;
  getWeatherData(city)
  .then((res)=>{
    console.log(res);
    showWeatherData(res);
  }).catch((error)=>{
    console.log(error);
    alert(`Sorry, ${city}'s weather is not currently available in our site, Search nearest place . `);
    
          
  })
}


showWeatherData = (weatherData) => {
 const{ name } =weatherData;
  const{ temp,humidity,feels_like }=weatherData.main;

  const{ speed }=weatherData.wind;
  const{ icon,description }=weatherData.weather[0];
  console.log(name,temp,humidity,speed,icon,description,feels_like);
  
  document.querySelector(".city-name").innerText = "Weather in "+ name;
  document.querySelector(".icon").src =
  "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp+"°C";
  document.querySelector(".feels_like").innerText = "feels-like :"+feels_like+"°C";
  document.querySelector(".humidity").innerText =  "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText =  "Wind speed: " + speed + " km/h";
  document.body.style.background =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
      document.querySelector(".weather").classList.remove("loading");
}




document
  .querySelector(".city-input")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      searchCity();
    }
  });

