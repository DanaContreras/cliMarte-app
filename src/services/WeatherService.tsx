import weatherData from '../assets/data/weatherData.json';

// Simula una llamada a la API Insight para obtener los datos del clima de Marte.

const fetchLatestSol = async () => {
	const solKeys = weatherData.sol_keys;
	return solKeys[solKeys.length - 1];
}

const fetchLatestWeather = async () => {
  const solKeys = weatherData.sol_keys;
  const latestSol = solKeys[solKeys.length - 1];
  return {
    sol: latestSol,
    ...weatherData[latestSol]
  };
};

const fetchWeatherInRange = async (start: number, end: number) => {
  const solKeys = weatherData.sol_keys;
  return solKeys
    .filter(key => {
      const sol = parseInt(key);
      return sol >= start && sol <= end;
    })
    .map(key => ({
			sol: key,
      ...weatherData[key]
		}));
};

export {
  fetchLatestSol,
  fetchLatestWeather,
  fetchWeatherInRange
};