export const API_KEY = 'MtSNGxGmHjAjxWNiT4aiNdMucvljOJUVA9ju6OLy';

export const fetchDailyImage = async (date: string) => {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
        if (!response.ok)
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en dailyImage:', error);
        throw error;
    }
};