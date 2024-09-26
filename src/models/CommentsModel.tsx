import RNFS from 'react-native-fs';

const pathComments = RNFS.DocumentDirectoryPath + '/commentsImage.json';

export interface Comment {
    userName: string,
    mail: string,
    comment: string,
    date: Date
};

export const getComments = async () => {
  try {
    let data;
    if (await RNFS.exists(pathComments)) {
      const localData = await getLocalComments();
      data = {success: true, data: localData};
    } else {
      data = {success: true, data: {}};
    }
    return data;
  } catch (error: any) {
    console.error('Error obteniendo los comentarios:', error);
    return {
      success: false,
      error: error.message || 'Ocurrió un error inesperado.',
    };
  }
};

export const addComment = async (comment: Comment) => {
  try {
    let data = [];

    // Verificar si el archivo existe y obtener los comentarios almacenados
    if (await RNFS.exists(pathComments)) {
        data = await getLocalComments();
    }

    // Asegurarse de que data sea un array
    if (!Array.isArray(data)) {
        data = [];
    }

    // Añadir el nuevo comentario
    data.push(comment);

    // Guardar los comentarios actualizados
    await saveComment(data);
  } catch (error: any) {
    console.error('Error al agregar comentario: ', error);
  }
};

const getLocalComments = async () => {
  try {
    const data = await RNFS.readFile(pathComments, 'utf8');
    
    // Intentar parsear los datos, si no son un array, devolver un array vacío
    const parsedData = JSON.parse(data);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Error leyendo los comentarios locales:', error);
    return [];  // Devolver array vacío en caso de error
  }
};

const saveComment = async (comments: Comment[]) => {
  try {
    await RNFS.writeFile(pathComments, JSON.stringify(comments), 'utf8');
  } catch (error) {
    console.error('Error guardando los datos localmente:', error);
  }
};

export const deleteComments = async () => {
  try {
    const fileExists = await RNFS.exists(pathComments);
    if (fileExists) {
      await RNFS.unlink(pathComments);
      console.log('Archivo eliminado exitosamente:', pathComments);
    }
  } catch (error) {
    console.error('Error eliminando el archivo:', error);
  }
};