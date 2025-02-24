const express = require('express');
const ruta = express.Router();
const validaciones = require('../js/validaciones');
const archivo = require('../js/manipulacionArchivo');

// Get que permite ver los comentarios de una fecha especifica, buscandolos por su id = fecha.
ruta.get('/:fecha', async (req, res) => {
    const fecha = req.params.fecha;
   
    if (validaciones.verificarFormatoFecha(fecha)) {
        
        let comentarios = [];
        let vacio = true;
        try {
            // Se controla que el archivo json no se encuentre vacio.
            vacio = archivo.estaVacioComentarios();
            
            if (!vacio)
                comentarios = archivo.getComentarios(fecha);
            
            res.json(comentarios);
            
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor.' })
        }

    } else
        res.status(400).json({ error: 'La fecha ingresada no tiene el formato correcto.' })

})

// Get principal de la ruta, se pasan parametros a través del query, y devuelve los comentarios contenidos en un rango de fechas.
ruta.get('/', async (req, res) => {

    const {fechaInicio, fechaFin} = req.query;

    // Se verifica que las fechas tenga el formato YYYY-MM-DD y fechaInicio < fechaFin.
    const verificacion = validaciones.verificarFormatoFecha(fechaInicio) && validaciones.verificarFormatoFecha(fechaFin) && validaciones.verificarRangoFechas(fechaInicio, fechaFin);
    
    if (verificacion) {
        let vacio = true;
        let comentariosRango = [];
        try {
            // Se controla que el archivo json no se encuentre vacio.
            vacio = archivo.estaVacioComentarios();

            // Se busca el rango localmente.
            if (!vacio)
                comentariosRango = archivo.getComentariosRangoFechas(fechaInicio, fechaFin);

            res.json(comentariosRango || []);

        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor.' })
        }

    } else {
        res.status(400).json({ error: 'Las fechas ingresadas no tienen el formato correcto.' })
    }

})

ruta.post('/', (req, res) => {

    const { fecha, nombreUsuario, mail, comentario } = req.body;
    console.log(fecha, nombreUsuario, mail, comentario);
    let actualizado = false;
    // Validar los campos obligatorios
    if (!fecha || !nombreUsuario || !mail || !comentario)
        res.status(400).json({ error: 'Faltan campos obligatorios.' });
    else if (!validaciones.verificarFormatoFecha(fecha))
        res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD.' });
    else {
        actualizado = archivo.actualizarComentarios(fecha, nombreUsuario, mail, comentario);
        
        if (actualizado)
            res.status(201).json({ mensaje: 'Comentario guardado exitosamente.' });
        else
            res.status(500).json({ error: 'Error al guardar el comentario.' });
    }
        
});

module.exports = ruta;