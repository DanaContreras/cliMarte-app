import RNFS, { read } from 'react-native-fs';
import { fileExists, saveFile } from '../services/StorageService';
import { PATHS } from '../constans/storagePaths';
import { readFile } from '../services/StorageService';
export interface Comment {
    userName: string,
    mail: string,
    comment: string,
    date: Date
};

export const getComments = async () => {
  let data;
  try {
    if (await fileExists(PATHS.COMMENTS)) {
      const localData = await readFile(PATHS.COMMENTS);
      data = {success: true, data: localData};
    } else {
      data = {success: true, data: []};
    }
  } catch (error: any) {
    console.error('Error obteniendo los comentarios:', error);
    data = { success: false, error: error.message || 'Ocurrió un error inesperado.'};
  }
  return data;
};

export const addComment = async (comment: Comment) => {
  try {
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

// const getLocalComments = async () => {
//   try {
//     const data = await RNFS.readFile(PATHS.COMMENTS, 'utf8');
    
//     // Intentar parsear los datos, si no son un array, devolver un array vacío
//     const parsedData = JSON.parse(data);
//     return Array.isArray(parsedData) ? parsedData : [];
//   } catch (error) {
//     console.error('Error leyendo los comentarios locales:', error);
//     return [];  // Devolver array vacío en caso de error
//   }
// };