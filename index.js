const express = require('express');
const app = express();
const port = 3005;
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para validar métodos HTTP
function validateHTTPMethods(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(405).send("Método HTTP no permitido");
  }
  next();
}

// Middleware para validar parámetros en list-view-router
function validateParams(req, res, next) {
  const taskId = req.params.taskId;
  if (!taskId || !/^\d+$/.test(taskId)) {
    return res.status(400).json({ error: "Parámetro taskId no válido" });
  }
  next();
}

// Middleware para manejar solicitudes POST con el cuerpo vacío o datos inválidos
function validateCreateTask(req, res, next) {
  const newTask = req.body;
  if (!newTask || !newTask.description) {
    return res.status(400).json({ error: "Datos de tarea no válidos" });
  }
  next();
}

// Middleware para manejar solicitudes PUT con el cuerpo vacío o datos inválidos
function validateUpdateTask(req, res, next) {
  const updatedTask = req.body;
  if (!updatedTask || !updatedTask.description) {
    return res.status(400).json({ error: "Datos de tarea no válidos" });
  }
  next();
}

// Agrega el middleware para validar métodos HTTP a nivel de aplicación
app.use(validateHTTPMethods);

// Montar el router de lista de visualización en '/list-view'
app.use('/list-view', listViewRouter);

// Montar el router de edición de lista en '/list-edit'
app.use('/list-edit', listEditRouter);

// ..

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});