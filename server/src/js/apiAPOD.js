const fetch = require('node-fetch');
const config = require('./config');

const getImagenDelDia = async (fecha) => {
    // Se obtiene la imagen correspondiente a la fecha pasada por parametro.

    let imagen = null;

    try {
        const respuesta = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + config.key + '&date=' + fecha + '&');
        console.log("Solicitud completada:", respuesta.status);
        imagen = await respuesta.json();
        console.log(imagen);
    } catch (error) {
        throw error;
    }

    return imagen;
}

const getImagenesRangoFechas = async (fechaInicio, fechaFin) => {
    // Se obtiene las imagenes dentro del rango de fechas.

    let imagenes = null;

    try {
        const respuesta = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + config.key + '&start_date=' + fechaInicio + '&end_date=' + fechaFin);
        imagenes = await respuesta.json();

    } catch (error) {
        throw error;
    }

    return imagenes;
}

module.exports = {
    getImagenDelDia,
    getImagenesRangoFechas
};
