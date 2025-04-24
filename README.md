# Mi Aplicación Express.js

Esta es una aplicación básica construida con [Express.js](https://expressjs.com/), diseñada para demostrar cómo usar Docker para contenerizar una aplicación Node.js.

## ¿Qué es Express.js?

Express.js es un framework minimalista para Node.js que permite crear aplicaciones web y APIs de manera rápida y sencilla.

## Requisitos

- [Docker](https://www.docker.com/) instalado en tu sistema.

## Construcción y Ejecución con Docker

### Construir la Imagen Docker

Para construir la imagen Docker de la aplicación, ejecuta el siguiente comando en la raíz del proyecto (donde se encuentra el archivo `Dockerfile`):

```bash
docker build -t mi-ejemplo-express .
```

Este comando:

- Usa el archivo `Dockerfile` para construir una imagen.
- Asigna el nombre `mi-ejemplo-express` a la imagen.

### Ejecutar la Aplicación con Docker

Para ejecutar la aplicación en un contenedor Docker, utiliza el siguiente comando:

```bash
# docker run -it --rm -p 3000:3000 -v $(pwd):/app mi-ejemplo-express
docker run -it --rm -p 3000:3000 mi-ejemplo-express
```

Este comando:

- `-it`: Ejecuta el contenedor en modo interactivo.
- `--rm`: Elimina automáticamente el contenedor cuando se detiene.
- `-p 3000:3000`: Mapea el puerto 3000 del contenedor al puerto 80 de tu máquina local.
- `-v $(pwd):/app`: Monta el directorio actual (`$(pwd)`) en el contenedor en la ruta `/app`.
- `mi-ejemplo-express`: Especifica la imagen que se usará para crear el contenedor.

Una vez que el contenedor esté en ejecución, la aplicación estará disponible en `http://localhost:3000`.

## Uso de la Aplicación

Puedes interactuar con la aplicación utilizando `curl` desde la terminal. Aquí hay algunos ejemplos:

### Obtener la lista de usuarios
```bash
curl http://localhost:3000/api/users
```

### Obtener un usuario por ID
```bash
curl http://localhost:3000/api/users/1
```

### Crear un nuevo usuario
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "David"}' http://localhost:3000/api/users
```

### Actualizar un usuario existente
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Eve"}' http://localhost:3000/api/users/1
```

### Eliminar un usuario
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Estructura del Proyecto

- `app.js`: Archivo principal que define las rutas y la lógica de la aplicación.
- `Dockerfile`: Archivo para construir la imagen Docker.

## Manejo de Errores

Si ocurre un error en el servidor, se devolverá un mensaje de error con el código de estado HTTP 500.