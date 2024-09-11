const apiKey = process.env.API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const cityInput = document.getElementById('cityInput') as HTMLInputElement;
const getWeatherBtn = document.getElementById('getWeatherBtn') as HTMLButtonElement;
const weatherResult = document.getElementById('weatherResult') as HTMLElement;

async function getWeather(city: string): Promise<void> {
  try {
    const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data: WeatherResponse = await response.json();

    if (response.ok) {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      weatherResult.innerHTML = `Current weather in ${data.name}: ${temp}°C, ${description}`;
    } else {
      weatherResult.innerHTML = `City not found! Please enter a valid city.`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherResult.innerHTML = `Error fetching weather data.`;
  }
}

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
  }
});
