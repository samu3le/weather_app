let d = document;
let api_key = "c1888ac042bb5e9b1d9e4cc047c9dd4a";

const fetchWeather = async(city) => {
    await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            api_key
        )
        .then((resp) => resp.json())
        .then((data) => displayWeather(data));
};

const displayWeather = (data) => {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
    data.main;
    const { speed } = data.wind;

    d.querySelector(".city").innerHTML = "Weather in " + name;
    d.querySelector(".temp").innerHTML = temp + "°C";
    d.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
    d.querySelector(".description").innerHTML = description;
    d.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    d.querySelector(".wind").innerHTML = "Wind: " + speed + " Km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
};

const search = () => {
    fetchWeather(d.querySelector(".search-bar").value);
};

d.querySelector(".btn").addEventListener("click", (event) => {
    search();
});

d.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        search();
    }
});

fetchWeather("Denver");