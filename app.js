// Importamos el módulo Express
const express = require("express");

// Creamos una instancia de la aplicación Express
const app = express();

// Definimos el puerto en el que la aplicación escuchará las solicitudes
const port = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
// Esto permite que podamos acceder a los datos enviados en formato JSON a través de req.body
app.use(express.json());

// Middleware para registrar cada solicitud que llega al servidor
// Este middleware imprime en la consola el método HTTP y la URL de cada solicitud
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Llama al siguiente middleware o ruta
});

// Ruta principal (GET /)
// Cuando un usuario accede a la raíz del servidor, se envía una página HTML con información sobre la API
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Bienvenida</title>
    </head>
    <body>
      <h1>¡Bienvenido a mi aplicación Express.js!</h1>
      <p>Para ver a los usuarios, visita <a href="/api/users">/api/users</a></p>
      <p>Para ver un usuario específico, visita <code>/api/users/:id</code></p>
      <p>Para crear un nuevo usuario, envía una solicitud POST a <code>/api/users</code></p>
      <p>Para actualizar un usuario, envía una solicitud PUT a <code>/api/users/:id</code></p>
      <p>Para eliminar un usuario, envía una solicitud DELETE a <code>/api/users/:id</code></p>
    </body>
    </html>
  `);
});

// Simulación de una base de datos con un arreglo de usuarios
// Cada usuario tiene un id y un nombre
const users = [
  { id: 1, name: "Felipe" },
  { id: 2, name: "Christopher" },
  { id: 3, name: "Isaid" },
  { id: 4, name: "Juan" }
];

// Ruta para obtener la lista de usuarios (GET /api/users)
// Devuelve el arreglo completo de usuarios en formato JSON
app.get("/api/users", (req, res) => {
  res.json(users); // Envía la lista de usuarios como respuesta
});

// Ruta para obtener un usuario por ID (GET /api/users/:id)
// Busca un usuario en el arreglo por su ID y lo devuelve en formato JSON
app.get("/api/users/:id", (req, res) => {
  // Busca el usuario cuyo id coincida con el parámetro enviado en la URL
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    // Si no se encuentra el usuario, devuelve un error 404
    return res.status(404).send("Usuario no encontrado");
  }
  res.json(user); // Envía el usuario encontrado como respuesta
});

// Ruta para crear un nuevo usuario (POST /api/users)
// Agrega un nuevo usuario al arreglo de usuarios
app.post("/api/users", (req, res) => {
  // Crea un nuevo usuario con un ID único y el nombre enviado en el cuerpo de la solicitud
  const newUser = {
    id: users.length + 1, // El ID es el tamaño actual del arreglo + 1
    name: req.body.name, // El nombre se obtiene del cuerpo de la solicitud
  };
  users.push(newUser); // Agrega el nuevo usuario al arreglo
  res.status(201).json(newUser); // Devuelve el nuevo usuario con un código de estado 201 (creado)
});

// Ruta para actualizar un usuario existente (PUT /api/users/:id)
// Busca un usuario por ID y actualiza su nombre
app.put("/api/users/:id", (req, res) => {
  // Busca el usuario cuyo id coincida con el parámetro enviado en la URL
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    // Si no se encuentra el usuario, devuelve un error 404
    return res.status(404).send("Usuario no encontrado");
  }
  user.name = req.body.name; // Actualiza el nombre del usuario con el valor enviado en el cuerpo de la solicitud
  res.json(user); // Devuelve el usuario actualizado como respuesta
});

// Ruta para eliminar un usuario (DELETE /api/users/:id)
// Elimina un usuario del arreglo por su ID
app.delete("/api/users/:id", (req, res) => {
  // Encuentra el índice del usuario cuyo id coincida con el parámetro enviado en la URL
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    // Si no se encuentra el usuario, devuelve un error 404
    return res.status(404).send("Usuario no encontrado");
  }
  users.splice(userIndex, 1); // Elimina el usuario del arreglo
  res.status(204).send(); // Devuelve un código de estado 204 (sin contenido)
});

// Middleware para manejo de errores
// Captura errores no manejados en la aplicación y devuelve un mensaje de error genérico
app.use((err, req, res, next) => {
  console.error(err.stack); // Imprime el error en la consola
  res.status(500).send("Algo salió mal"); // Devuelve un error 500 (error interno del servidor)
});

// Inicia el servidor y lo pone a escuchar en el puerto definido
app.listen(port, "0.0.0.0", () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
