import {format} from 'date-fns';
import {fetchDailyImage} from '../services/ApiAPODService';
import {toZonedTime} from 'date-fns-tz';
import { readFile, saveFile, fileExists, deleteFile } from '../services/StorageService';
import { PATHS } from '../constans/storagePaths';

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
        if (await fileExists(PATHS.DAILY_IMAGE)) {
          const localData = await readFile(PATHS.DAILY_IMAGE);
          if (localData.date !== currentDate) {
            const apiResponse = await fetchDailyImage(currentDate);
            if (apiResponse.success) {
              await saveFile(PATHS.DAILY_IMAGE, apiResponse.data);
              await deleteFile(PATHS.COMMENTS);
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
            await saveFile(PATHS.DAILY_IMAGE, apiResponse.data);
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