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
		data.data = parseInt(latestSol);
	} catch (error: any) {
		console.error('Error al obtener el numero del último sol: ', error);
		data.error = error.message || 'Ocurrió un error inesperado.';
	}
	return data;
};

const getWeatherToday = async () => {
  const data: Result = {success: false, data: null, error: null, warning: null};
  try {
    const lastestWeather = await fetchLatestWeather();
    data.success = true;
    data.data = lastestWeather;
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
			const sortedData = weatherInRange.sort((a, b) => parseInt(b.sol) - parseInt(a.sol));
			data.success = true;
			data.data = sortedData;
		} else {
			data.success = false;
			data.error = 'El rango de fechas es incorrecto.';
		}
  } catch (error: any) {
    console.error('Error al obtener el rango de datos de weather: ', error);
    data.error = error.message || 'Ocurrió un error inesperado.';
  }
  return data;
};

export {
  getLatestSol,
  getWeatherToday,
  getWeatherInRange
};