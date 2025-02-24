import {
	fetchLatestSol,
  fetchLatestWeather,
  fetchWeatherInRange,
} from '../services/WeatherService';

interface Result {
  success: boolean;
  data: any[] | number | null;
  error?: string | null;
  warning?: string | null;
}

interface ResultInt{
  success: boolean;
  data: number;
  error?: string | null;
}

const getLatestSol = async () => {
	const data: ResultInt = {success: false, data: 0, error: null };
	try {
		const latestSol = await fetchLatestSol();
		data.success = true;
		data.data = parseInt(latestSol.data);
	} catch (error: any) {
		data.error = error.message || 'Ocurrió un error inesperado.';
	}
	return data;
};

const getWeatherToday = async () => {
  const data: Result = {success: false, data: null, error: null, warning: null};
  try {
    const lastestWeather = await fetchLatestWeather();
    if (!lastestWeather.success) {
      data.error = lastestWeather.error;
    } else {
      data.success = true;
      data.data = lastestWeather.data;
    }

  } catch (error: any) {
    console.error('Error al obtener el ultimo dato de weather: ', error);
    data.error = error.message || 'Ocurrió un error inesperado.';
  }
  
  return data;
};

const getWeatherInRange = async (start: number, end: number) => {
  const data: Result = {success: false, data: null, error: null, warning: null};
  try {
		if (start < end) {
			const weatherInRange = await fetchWeatherInRange(start, end);
      const weatherData = weatherInRange.data.datos;

      const formattedData = Object.entries(weatherData)
      .map(([sol, data]) => ({
        sol,
        ...data
      }))
      .sort((a, b) => b.sol - a.sol);

			data.success = true;
			data.data = formattedData;
		} else {
			data.success = false;
			data.error = 'El rango de fechas es incorrecto.';
		}
  } catch (error: any) {
    data.error = error.message || 'Ocurrió un error inesperado.';
  }
  return data;
};

export {
  getLatestSol,
  getWeatherToday,
  getWeatherInRange
};