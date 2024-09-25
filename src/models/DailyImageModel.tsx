import { format } from 'date-fns';
import { fetchDailyImage } from "../services/ApiService";
import RNFS from 'react-native-fs';

const path = RNFS.DocumentDirectoryPath + '/dailyImage.json';

export const getDailyImage = async () => {

	try {
		let data;
		const currentDate = format(new Date(), 'yyyy-MM-dd');

		if (currentDate < '1995-06-16') {
			data = { success: false, error: 'La fecha actual es menor a la permitida.' }
		} else {
			if (await RNFS.exists(path)) {
				const localData = await getLocalData();
				data = { success: true, data: localData }
			}
			else {
				const response = await fetchDailyImage(currentDate);
				await saveData(response);
				data = { success: true, data: response };
			}
		}
		return data;
	} catch (error: any) {
		console.error('Error obteniendo la imagen del día:', error);
		return { success: false, error: error.message || 'Ocurrió un error inesperado.' };
	}
}

const getLocalData = async () => {
    try {
        const data = await RNFS.readFile(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo los datos locales:', error);
        return null;
    }
}

const saveData = async (data: any) => {
	try {
			await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
	} catch (error) {
			console.error('Error guardando los datos localmente:', error);
	}
};