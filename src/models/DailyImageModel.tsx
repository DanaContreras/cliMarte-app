import {format} from 'date-fns';
import {fetchDailyImage} from '../services/ApiService';
import {toZonedTime} from 'date-fns-tz';
import RNFS from 'react-native-fs';
import { deleteComments } from './CommentsModel';

const path = RNFS.DocumentDirectoryPath + '/dailyImage.json';

interface Result {
	success: boolean;
	data: string | null;
	error?: string | null;
	warning?: string | null;
  }

  export const getDailyImage = async () => {
    const result: Result = {
      success: false,
      data: null,
      error: null,
      warning: null,
    };
  
    try {
      const timeZone = 'America/Argentina/Buenos_Aires';
      const date = new Date();
      const zonedDate = toZonedTime(date, timeZone);
      const currentDate = format(zonedDate, 'yyyy-MM-dd');
      
      if (currentDate < '1995-06-16') {
        result.error = 'La fecha actual es menor a la permitida.';
      } else {
        const localExists = await RNFS.exists(path);
        if (localExists) {
          const localData = await getLocalData();
          if (localData.date !== currentDate) {
            const apiResponse = await fetchDailyImage(currentDate);
            if (apiResponse.success) {
              await saveData(apiResponse.data);
              deleteComments();
              result.success = true;
              result.data = apiResponse.data;
            } else {
              result.success = true;
              result.data = localData;
              result.warning = 'No se pudo obtener la imagen del día actualizada en este momento.';
            }
          } else {
            result.success = true;
            result.data = localData;
          }
        } else {
          const apiResponse = await fetchDailyImage(currentDate);
          if (apiResponse.success) {
            await saveData(apiResponse.data);
            result.success = true;
            result.data = apiResponse.data;
          } else {
            result.error =
              'No es posible obtener la imagen del día en este momento. Intente nuevamente más tarde.';
          }
        }
      }
    } catch (error: any) {
      result.error = error.message || 'Ocurrió un error inesperado.';
    }
  
    return result;
  };

const getLocalData = async () => {
  try {
    const data = await RNFS.readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo los datos locales:', error);
    return null;
  }
};

const saveData = async (data: any) => {
  try {
    await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.error('Error guardando los datos localmente:', error);
  }
};
