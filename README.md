# ikualo-project

## README.md

### Descripción del proyecto

Este proyecto se compone de dos partes: un servidor cliente y un servidor backend. El servidor cliente se encarga de mostrar una interfaz gráfica al usuario, mientras que el servidor backend se encarga de procesar las solicitudes del cliente y almacenar los datos.

### Requisitos previos

Para ejecutar este proyecto, necesitarás lo siguiente:

- **Node.js:** Puedes descargarlo desde [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager).
- **npm:** Viene instalado con Node.js.
- **pnpm:** Puedes descargarlo desde [https://pnpm.io/es/installation#usando-pnpm](https://pnpm.io/es/installation#usando-pnpm).
- **Git:** Puedes descargarlo desde [https://www.git-scm.com/download/win](https://www.git-scm.com/download/win).
- **Docker:** Puedes descargarlo desde [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/).
- **Twilio Account:** Este servicio se utiliza para la verificación en dos pasos [https://login.twilio.com/u/signup?state=hKFo2SBvQWtzX3Y5VzI1cUlWZ29Va3BTLTR6S2MzYk5EemdQeaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGhBMEtEQ014b1NHdDJTb1pseUFEQ1hDQUN0bXNDRVhKo2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks](https://login.twilio.com/u/signup?state=hKFo2SBvQWtzX3Y5VzI1cUlWZ29Va3BTLTR6S2MzYk5EemdQeaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGhBMEtEQ014b1NHdDJTb1pseUFEQ1hDQUN0bXNDRVhKo2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks)

### Configuración

1. Clona este repositorio en tu ordenador local:

```bash
git clone https://gitlab.com/gitlab-org/gitlab
```

2. Accede al directorio del proyecto:

```bash
cd mi-proyecto
```

3. Instala las dependencias del proyecto:

```bash
npm install
```

### Ejecución del servidor

#### Servidor cliente

Para ejecutar el servidor cliente, ejecuta el siguiente comando:

```bash
pnpm start:dev:client
```

ó

```bash
npm run start:dev:client
```

Esto abrirá una nueva ventana del navegador con la interfaz gráfica del proyecto.

Esto iniciara el servidor backend en el puerto 9000.

#### Servidor backend

Para ejecutar el servidor backend, ejecuta el siguiente comando:

```bash
pnpm start:dev:server
```

ó

```bash
npm run start:dev:server
```

El backend necesitará una variables de entorno necesarias para funcionar y tener disponibles todas las funcionalidades

```typescript
interface Env {
	TWILIO_ACCOUNT_SID: string;
	TWILIO_AUTH_TOKEN: string;
	TWILIO_VERIFY_SERVICE: string;
	DB_URI: string;
	JWT_SECRET: string;
}
```

Esto iniciará el servidor backend en el puerto 3000.

### Pruebas

Para probar el proyecto, puedes abrir la interfaz gráfica del servidor cliente en tu navegador web y seguir las instrucciones en pantalla.

### Notas

- Asegúrate de tener Node.js y npm instalados y configurados correctamente antes de continuar.
- Si tienes algún problema al ejecutar el proyecto, consulta la documentación de Node.js y npm para obtener más información.

### Contribuciones

Se agradecen las contribuciones a este proyecto. Si encuentras un error o quieres añadir una nueva función, no dudes en crear una solicitud de extracción.

### Licencia

Este proyecto está bajo la licencia MIT. Para obtener más información, consulta el archivo LICENSE.md.
