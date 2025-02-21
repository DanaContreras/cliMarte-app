import weatherData from '../assets/data/weatherData.json';

const fetchLatestSol = async () => {
  let result;

  try {
    const response = await fetch(
      `http://10.0.2.2:3000/api/datosClima/LlavesClimas`
    );

    if (!response.ok) {
      result = { success: false, error: `Error: ${response.status} ${response.statusText}` };
    } else {
      const data = await response.json();
      const latestSol = data[data.length() - 1]
      result = { success: true, data: latestSol };
      console.log(result)
    }
  } catch (error: any) {
    result = { success: false, error: error.message || 'Error inesperado.' };
  }

	return result;
}

const fetchLatestWeather = async () => {
  let result;

  try {
    const response = await fetchLatestSol();

    if (!response.success) {
      result = { success: false, error: response.error };
    } else {
      const data = await response.data;
      const latestSol = data[data.length() - 1]
      result = { success: true, latestSol };
      console.log(result)
    }
  } catch (error: any) {

  }
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