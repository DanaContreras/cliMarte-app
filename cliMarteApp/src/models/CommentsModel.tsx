import RNFS, { read } from 'react-native-fs';
import { fileExists, saveFile } from '../services/StorageService';
import { fetchDailyComments, postDailyComment } from '../services/CommentsService';
import { PATHS } from '../constans/storagePaths';
import { readFile } from '../services/StorageService';
import {toZonedTime} from 'date-fns-tz';
import {format} from 'date-fns';
export interface Comment {
    username: string,
    mail: string,
    comment: string,
    date: string
};

export const getComments = async () => {
  let data;
  try {
    const timeZone = 'America/Argentina/Buenos_Aires';
    const date = new Date();
    const zonedDate = toZonedTime(date, timeZone);
    const currentDate = format(zonedDate, 'yyyy-MM-dd');

    // Obtener comentarios desde la API
    const apiResponse = await fetchDailyComments(currentDate);

    if (!apiResponse.success) {
      console.error('Error obteniendo los comentarios desde la API:', apiResponse.error);
      return { success: false, error: apiResponse.error };
    }

    const apiComments = apiResponse.data;

    // Verificar si el archivo local existe
    let localComments = [];
    if (await fileExists(PATHS.COMMENTS)) {
      const localData = await readFile(PATHS.COMMENTS);
      localComments = JSON.parse(localData);
    }

    const isOutdated =
      !localComments[currentDate] ||
      localComments[currentDate].length !== apiComments.length;

    if (isOutdated) {
      console.log('La versión local está desactualizada. Actualizando...');

      // Actualizar los comentarios locales
      localComments[currentDate] = apiComments;
      await saveFile(PATHS.COMMENTS, JSON.stringify(localComments));
    }
    console.log('Comentarios actualizados:', localComments[currentDate]);
    data = { success: true, data: localComments[currentDate] || [] };
  } catch (error: any) {
    console.error('Error obteniendo los comentarios:', error);
    data = { success: false, error: error.message || 'Ocurrió un error inesperado.' };
  }
  
  return data;
};

export const addComment = async (comment: Comment) => {
  try {

    const timeZone = 'America/Argentina/Buenos_Aires';
    const date = comment.date;
    const zonedDate = toZonedTime(date, timeZone);
    const currentDate = format(zonedDate, 'yyyy-MM-dd');

    const apiResponse = await postDailyComment(
      currentDate,
      comment.username,
      comment.mail,
      comment.comment
    );

    if (!apiResponse.success)
      console.error('Error al guardar el comentario en la API:', apiResponse.error);

    let data = [];

    if (await fileExists(PATHS.COMMENTS)) {
      data = await readFile(PATHS.COMMENTS);
      data = JSON.parse(data);
    }

    data.push(comment);
    await saveFile(PATHS.COMMENTS, JSON.stringify(data));

  } catch (error: any) {
    console.error('Error al agregar comentario: ', error);
  }
};