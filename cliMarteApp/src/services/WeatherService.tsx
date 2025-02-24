
const fetchLatestSol = async () => {
  let result;

  try {
    const response = await fetch(
      `http://10.0.2.2:3000/api/datosClima/LlavesClimas`
      //`http://localhost:3000/api/datosClima/LlavesClimas`
    );

    if (!response.ok) {
      result = { success: false, error: `Error: ${response.status} ${response.statusText}` };
    } else {
      const data = await response.json();
      const latestSol = data[data.length - 1]
      result = { success: true, data: latestSol };
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
      console.log('Error al obtener el último sol:', response.error);
      result = { success: false, error: response.error };
    } else {
      const latestSol = await response.data;
      const responseLatestWeather = await fetch(`http://10.0.2.2:3000/api/datosClima/${latestSol}`);
      
      if (!responseLatestWeather.ok) {
        result = { success: false, error: responseLatestWeather.error };
      } else {
        const dataLatestWeather = await responseLatestWeather.json();
        
        result = { success: true, data: {
          sol: latestSol,
          ...dataLatestWeather
          }
        }
      }
    }
  } catch (error: any) {
    result = { success: false, error: error.message || 'Error inesperado.' };
  }

  return result;
};

const fetchWeatherInRange = async (start: number, end: number) => {
  
  try {
    const response = await fetch(
      `http://10.0.2.2:3000/api/datosClima?inicio=${start}&fin=${end}`
    );

    if (!response.ok) {
      return { success: false, error: response.error };
    } else {
      const data = await response.json();
      return { success: true, data: data };
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Ocurrió un error inesperado.' };
  };
};

export {
  fetchLatestSol,
  fetchLatestWeather,
  fetchWeatherInRange
};