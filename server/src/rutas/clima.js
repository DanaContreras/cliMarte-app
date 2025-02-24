//Requires utilizados. 
const express = require('express');
const ruta = express.Router();
const path = require('path');
const {verificarLimitesIndice, verificarSolKey} = require('../js/validaciones');
const fs = require('fs');

//get principal de la ruta, se pasan parametros a través del query, y devuelve los climas de los soles desde el from como índice hasta la cantidad requerida.
ruta.get('/', (req, res) => {
    // Parámetros, convertidos a enteros
    let { inicio, fin } = req.query;
    inicio = parseInt(inicio);
    fin = parseInt(fin);

    // Recupera el JSON de los climas y obtiene el arreglo de soles
    const climasString = fs.readFileSync(path.join(__dirname + '/../json/climas.json'), 'utf-8');
    const climasJson = JSON.parse(climasString);
    const arregloSoles = climasJson["sol_keys"];
    const largoArreglo = arregloSoles.length;

    console.log(`Sol Inicio: ${inicio}, Sol Fin: ${fin}, Largo: ${largoArreglo}`);

    // Verifica que los parámetros sean válidos
    if (inicio > fin) {
        return res.status(400).send('Error: Datos ingresados incorrectos');
    }

    // Filtrar los soles dentro del rango especificado
    const solesFiltrados = arregloSoles.filter(sol => {
        const solNum = parseInt(sol);
        return solNum >= inicio && solNum <= fin;
    });

    // Construcción del objeto de respuesta
    const respuesta = {
        'sol_keys': solesFiltrados,
        'datos': {}
    };

    // Agregar la información de cada sol en el rango
    solesFiltrados.forEach(sol => {
        respuesta['datos'][sol] = climasJson[sol];
    });

    // Responder con el JSON
    res.status(200).json(respuesta);
});


//Get para poder ver de manera rapido el arreglo con todas las sol_keys
ruta.get('/LlavesClimas', (req, res) => {

    const climasString = fs.readFileSync(path.join(__dirname + '/../json/climas.json'), 'utf-8');
    const climasJson = JSON.parse(climasString);

    res.status(200).send(climasJson["sol_keys"]);
})

//Get que permite ver la información del clima de un Sol especifico, buscandolo por su sol_key o id
ruta.get('/:id', (req, res) => {

    const id = req.params.id;
    const climasString = fs.readFileSync(path.join(__dirname + '/../json/climas.json'), 'utf-8');
    const climasJson = JSON.parse(climasString);

    const arregloSoles = climasJson["sol_keys"];

    if(verificarSolKey(arregloSoles, id)){
        res.status(200).send(climasJson[id]);
    } else {
        res.status(400).send('Error: ID ingresada no válida.');
    }
})

module.exports = ruta;