export const API_KEY = 'MtSNGxGmHjAjxWNiT4aiNdMucvljOJUVA9ju6OLy';

export const fetchDailyImage = async (date: string) => {
    let result;
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`,
      );
      if (!response.ok) {
        result = { success: false, error: `Error: ${response.status} ${response.statusText}` };
      }
      const data = await response.json();
      result = { success: true, data };
    } catch (error: any) {
        result = { success: false, error: error.message || 'Error inesperado.' };
    }
    return result;
  };
