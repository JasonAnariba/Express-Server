const express = require('express');
const app = express();

// Iniciar el servidor en el puerto 3000
const port = 3000;
// Lista de tareas
const tasks = [
  {
    id: "123456",
    isCompleted: false,
    description: "Walk the dog"
  },
  {
    id: "12345",
    isCompleted: false,
    descripcion:"estudiar"
  }
];

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});