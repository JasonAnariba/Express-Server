const express = require('express');
const listEditRouter = express.Router();


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
  }
];

// Ruta para crear una tarea
listEditRouter.post('/crear', (req, res) => {
  const newTask = req.body; // Supongamos que el cuerpo de la solicitud contiene los datos de la nueva tarea
  tasks.push(newTask);
  res.status(201).json(newTask);
  console.log("Tareas creada correctamente")
});

// Ruta para eliminar una tarea por ID
listEditRouter.delete('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

// Ruta para actualizar una tarea por ID
listEditRouter.put('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body; // Supongamos que el cuerpo de la solicitud contiene los datos actualizados de la tarea
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

module.exports = listEditRouter;