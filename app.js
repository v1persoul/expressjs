// app.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para registrar cada solicitud
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rutas principales
app.get("/", (req, res) => {
  res.send("!Bienvenido a mi aplicación Express.js¡");
  res.send("Para ver a los usuarios, visita /api/users");
  res.send("Para ver un usuario específico, visita /api/users/:id");
  res.send("Para crear un nuevo usuario, envía una solicitud POST a /api/users");
  res.send("Para actualizar un usuario, envía una solicitud PUT a /api/users/:id");
  res.send("Para eliminar un usuario, envía una solicitud DELETE a /api/users/:id");
});

// Ruta para obtener una lista de usuarios (simulación de una API)
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

// Ruta para obtener un usuario por ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Usuario no encontrado");
  }
  res.json(user);
});

// Ruta para crear un nuevo usuario
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Ruta para actualizar un usuario existente
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Usuario no encontrado");
  }
  user.name = req.body.name;
  res.json(user);
});

// Ruta para eliminar un usuario
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send("Usuario no encontrado");
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal");
});

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
