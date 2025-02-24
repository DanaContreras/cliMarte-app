const express = require('express');
const app = express();
const path = require('path');

//Configuraciones
const puerto = process.env.PORT || 3000;
app.set('port', puerto); 
app.set('json spaces', 2);

//Middlewares
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());

//Usando para pruebas y checkeos
/*app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path : ', req.path);
    console.log('method: ', req.method);
    next();
})*/

//Rutas
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/historial', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/html/historial.html'));
});

app.use('/api/imagenes', require('./rutas/imagenes'));
app.use('/api/datosClima', require('./rutas/clima'));
app.use('/api/comentarios', require('./rutas/comentarios'));

app.use((req, res) => {
    res.status(404).send('Error 404, página no encontrada.');
})

//comenzando servidor.
// app.listen(app.get('port'), () => {
//     console.log(`Servidor en puerto ${app.get('port')}`);
// });
app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Servidor corriendo en el puerto 3000');
  });