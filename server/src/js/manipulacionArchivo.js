const fs = require('fs');
const path = require('path');
const moment = require('moment')
const apiAPOD = require('./apiAPOD');
const archivo = path.join(__dirname + '/../json/datosImagenes.json');
const archivoComentarios = path.join(__dirname + '/../json/comentarios.json');

const verificarArchivoActualizado = () => {
    // Verifica si el archivo tiene los ultimos datos actualizados según la fecha.

    const fechaActual = moment();

    // Se obtiene el contenido del archivo.
    const contenidoArchivo = fs.readFileSync(archivo);
    const imagen = JSON.parse(contenidoArchivo); // Array con objetos.

    // Se obtiene la última fecha del json.
    const ultimaFecha = moment(imagen[imagen.length - 1]["date"]);

    return fechaActual.isSameOrBefore(ultimaFecha, 'day');
}

const estaVacio = () => {
    // Verifica si el archivo json se encuentra vacio.

    // Se obtiene el contenido del archivo.
    const contenidoArchivo = fs.readFileSync(archivo);
    const imagen = JSON.parse(contenidoArchivo); // Array con objetos.

    return (imagen.length === 0);
}

const estaVacioComentarios = () => {
    // Verifica si el archivo json de comentarios se encuentra vacio.

    // Se obtiene el contenido del archivo.
    const contenidoArchivo = fs.readFileSync(archivoComentarios);
    const comentarios = JSON.parse(contenidoArchivo); // Array con objetos.

    return (Object.keys(comentarios).length === 0);
}

const actualizarArchivo = async () => {
    // Actualiza json con los ultimos 15 datos más recientes en caso que la fecha actual no se encuentre en el mismo.
    let actualizado = false;

    try {
        const fechaFin = moment(); // Fecha de hoy.
        let fechaInicio;

        // Se obtiene el contenido del archivo.
        const contenidoArchivo = fs.readFileSync(archivo);
        const imagen = JSON.parse(contenidoArchivo); // Array con objetos.

        if (!estaVacio()) {
            // Se obtiene la última fecha del json.
            const ultimaFecha = moment(imagen[imagen.length - 1]["date"]);

            // Se borran los elementos desactualizados.
            const difEnDias = fechaFin.diff(ultimaFecha, 'days');
            if (difEnDias != 0)
                imagen.splice(0, difEnDias);

            // Se agregan los nuevos elementos.
            fechaInicio = ultimaFecha.add(1, 'days');;
            
        } else {
            fechaInicio = fechaFin.subtract(14, 'days')
        }
       
        // Se pide las imagenes a la Api, y se las incluye en el array.
        const imagenPedida = await apiAPOD.getImagenesRangoFechas(fechaInicio.format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
        imagenPedida.forEach(img => {
            imagen.push(img);
        });

        // Se guarda json con datos actualizados.
        const json = JSON.stringify(imagen, null, 2);
        fs.writeFileSync(archivo, json);
        actualizado = true;

    } catch (error) {
        console.log(error);
    }

    return actualizado;
}

const getImagen = (fecha) => {
    // Retorna la imagen con la fecha pasada por parámetro.

    // Se obtiene el contenido del archivo.
    const contenidoArchivo = fs.readFileSync(archivo);
    const imagen = JSON.parse(contenidoArchivo); // Array con objetos.

    let imgEncontrada = imagen.find(img => img["date"] == fecha);

    if (imgEncontrada === undefined)
        imgEncontrada = null;
    
    return imgEncontrada;
}

const getImagenesRangoFechas = (fechaInicio, fechaFin) => {
    // Devuelve las imagenes contenidas en [fechaInicio, fechaFin], caso contrario devuelve un array vacio.
    let imagenRango = [];

    // Se obtiene el contenido del archivo.
    const contenidoArchivo = fs.readFileSync(archivo);
    const imagen = JSON.parse(contenidoArchivo); // Array con objetos.

    // Se obtiene las imagenes del rango mediante indices de fechaInicio y fechaFin.
    const indiceFechaFin = imagen.findIndex(img => img["date"] == fechaFin);
    const difEnDias = moment(fechaFin).diff(moment(fechaInicio), 'days');
    const indiceFechaInicio = indiceFechaFin - difEnDias;

    if (indiceFechaFin != -1 && indiceFechaFin >= difEnDias)
        imagenRango = imagen.slice(indiceFechaInicio, indiceFechaFin + 1);

    return imagenRango;
}

const getComentarios = (fecha) => {
    // Devuelve los comentarios de la imagen con la fecha pasada por parámetro.

   // Verifica si el archivo existe y lo lee
   const contenidoArchivo = fs.readFileSync(archivoComentarios, 'utf-8');
   const comentarios = JSON.parse(contenidoArchivo);

   // Busca los comentarios de la fecha específica
   const comentariosEncontrados = comentarios[fecha];

   // Si no encuentra comentarios, devuelve null
   return comentariosEncontrados || null;
}

const getComentariosRangoFechas = (fechaInicio, fechaFin) => {
    // Devuelve los comentarios de las imagenes en el rango de fechas especificado.

    // Lee el archivo de comentarios
    const contenidoArchivo = fs.readFileSync(archivoComentarios, 'utf-8');
    const comentarios = JSON.parse(contenidoArchivo); // Convierte el JSON en objeto.

    // Convierte fechas a objetos Date para comparación
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (isNaN(inicio) || isNaN(fin)) {
        throw new Error('Formato de fecha inválido. Usa el formato "YYYY-MM-DD".');
    }

    // Filtra las fechas dentro del rango y construye el resultado
    const comentariosEnRango = Object.keys(comentarios).reduce((resultado, fecha) => {
        const fechaObj = new Date(fecha);

        if (fechaObj >= inicio && fechaObj <= fin) {
            resultado[fecha] = comentarios[fecha];
        }

        return resultado;
    }, {});

    return Object.keys(comentariosEnRango).length > 0 ? comentariosEnRango : null;
};

const actualizarComentarios = (fecha, username, mail, comment) => {

    let actualizado = false;

    const nuevoComentario = {
        username,
        mail,
        comment,
        date: new Date().toISOString(), // Fecha y hora actuales en formato ISO
    };
    
    try {
        // Leer el archivo de comentarios
        let datos = {};
        if (fs.existsSync(archivoComentarios)) {
            const contenido = fs.readFileSync(archivoComentarios, 'utf-8');
            datos = JSON.parse(contenido);
        }

        // Agregar el comentario a la fecha correspondiente
        if (!datos[fecha]) {
            datos[fecha] = []; // Crear el array si no existe
        }
        datos[fecha].push(nuevoComentario);

        // Guardar los datos actualizados en el archivo
        fs.writeFileSync(archivoComentarios, JSON.stringify(datos, null, 4), 'utf-8');

        actualizado = true;
    } catch (error) {
        console.error(error);
    }

    return actualizado;
}

module.exports = {
    verificarArchivoActualizado,
    estaVacio,
    estaVacioComentarios,
    actualizarArchivo,
    getImagen,
    getImagenesRangoFechas,
    getComentarios,
    getComentariosRangoFechas,
    actualizarComentarios
}