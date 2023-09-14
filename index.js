const express = require('express');
const app = express();
const port = 3005;
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// ...

// Montar el router de lista de visualización en '/list-view'
app.use('/list-view', listViewRouter);

// Montar el router de edición de lista en '/list-edit'
app.use('/list-edit', listEditRouter);

// ...

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});