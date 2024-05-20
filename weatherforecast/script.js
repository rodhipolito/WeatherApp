const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i");

const apiKey = "054ce9ea80cf560529d20d2941bef48e"; // Sua chave de API do OpenWeatherMap
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputField.value !== "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (inputField.value !== "") {
    requestApi(inputField.value);
  } else {
    alert("Por favor, insira o nome de uma cidade");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Obtendo detalhes do tempo...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Algo deu errado, erro na API";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod === "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} não é um nome de cidade válido`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    // Atualizar ícone de acordo com a condição climática
    if (id === 800) {
      wIcon.src = "http://codingstella.com/wp-content/uploads/2024/01/download-16.png";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "http://codingstella.com/wp-content/uploads/2024/01/download-17.png";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "http://codingstella.com/wp-content/uploads/2024/01/download-18.png";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "http://codingstella.com/wp-content/uploads/2024/01/download-19.png";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "http://codingstella.com/wp-content/uploads/2024/01/download-20.png";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "http://codingstella.com/wp-content/uploads/2024/01/download-21.png";
    }

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
