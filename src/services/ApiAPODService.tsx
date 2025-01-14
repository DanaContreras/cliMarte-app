export const fetchDailyImage = async (date: string) => {
    let result;
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/api/imagenes/${date}`
      );
      if (!response.ok) {
        result = { success: false, error: `Error: ${response.status} ${response.statusText}` };
      } else {
        const data = await response.json();
        result = { success: true, data };
      }
    } catch (error: any) {
      result = { success: false, error: error.message || 'Error inesperado.' };
    }
    return result;
  };
