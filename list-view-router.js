const express = require('express');
const listViewRouter = express.Router();

const tasks = [
  {
    id: "123456",
    isCompleted: false,
    description: "Walk the dog"
  },
  {
    id: "12345",
    isCompleted: false,
    description: "estudiar"
  },
  {
    id: "123444",
    isCompleted: true,
    description: "comer sano"
  }
];

// Middleware para validar parámetros en list-view-router
function validateParams(req, res, next) {
  const taskId = req.params.taskId;
  if (!taskId || !/^\d+$/.test(taskId)) {
    return res.status(400).json({ error: "Parámetro taskId no válido" });
  }
  next();
}

// Ruta para listar tareas completas
listViewRouter.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

// Ruta para listar tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

// Agregar el middleware para validar parámetros a la ruta que requiere parámetros
listViewRouter.get('/:taskId', validateParams, (req, res) => {
  const taskId = req.params.taskId;
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

module.exports = listViewRouter;