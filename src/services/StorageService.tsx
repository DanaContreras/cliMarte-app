import RNFS from 'react-native-fs';

const fileExists = async (filePath: string) => {
	let exists;
	try {
		exists = await RNFS.exists(filePath);
	} catch (error) {
		console.error('Error en file exists:', error);
		exists = false;
	}
	return exists;
}

const saveFile = async (filePath: string, data: string) => {
	try {
    await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.error('Error guardando los datos localmente:', error);
  }
};

const readFile = async (filePath: string) => {
	let data;
	try {
    data = await RNFS.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo los datos locales:', error);
    data = null;
  }
	return data;
};

const deleteFile = async (filePath: string) => {
	try {
    const fileExists = await RNFS.exists(filePath);
    if (fileExists) {
      await RNFS.unlink(filePath);
      console.log('Archivo eliminado exitosamente:', filePath);
    }
  } catch (error) {
    console.error('Error eliminando el archivo:', error);
  }
};

export {
	fileExists,
	saveFile,
	readFile,
	deleteFile,
};