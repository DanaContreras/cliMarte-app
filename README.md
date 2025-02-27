# CliMarte

## Presentación

**CliMarte tiene la misión de difundir sobre el planeta a 225 millones de km de la Tierra, Marte.** Proporciona diferentes datos meteorológicos que provee la NASA en la misión **InSight**. También ofrece una **imagen diaria** para aprender y comentar. Con esta aplicación, se pueden obtener datos actualizados sobre el clima de Marte, ver la imagen del día capturada por la NASA y explorar el historial meteorológico marciano.

### Funcionalidades principales
- **Inicio (Home):** Visualiza los datos meteorológicos del sol (día marciano) actual.
- **Imagen del Día:** Disfruta de la imagen diaria proporcionada por la API **APOD** de la NASA.
- **Historial:** Permite desplazarse a través de los soles más recientes hasta los más antiguos.
- **Acerca de Nosotros (About Us):** Conoce más sobre el proyecto y su misión.

![Logo CliMarte](./cliMarteApp/src/assets/images/logo_readme.png)


## Guía para ejecutar el proyecto localmente

### Requisitos previos

Asegurarse de tener las siguientes herramientas instaladas:

- **npm**.
- **React Native CLI**.
- **Android Studio** para emular la aplicación en un dispositivo Android.
- **Git** para clonar el repositorio.

### Instrucciones de instalación

1. **Clonar el repositorio**

   Clonar el repositorio del proyecto en local:

   ```bash
   git clone https://github.com/DanaContreras/cliMarte-app.git
   ```

2. **Instalar dependencias**

   Acceder al directorio del proyecto e instalar las dependiencias:

   ```bash
   npm install
   ```

3. **Agregar API key de la NASA**

   Ir a server/js/config.js y agregar la API key:

   ```javascript
   const API_KEY = 'Mi_Api_Key';
   ```

4. **Ejecutar servidor**

   ```bash
   cd server/src/
   node index.js
   ```

4. **Ejecutar metro**

   ```bash
   cd cliMarteApp/
   npm start
   ```

5. **Ejecutar aplicación**

   Se puede realizar por medio de metro o en la consola escribir el siguiente comando:

   ```bash
   npm run android
   ```
