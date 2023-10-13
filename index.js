const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3005;

// Middleware para parsear JSON
app.use(express.json());

// Usuarios predefinidos (simulación)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Ruta de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulación de autenticación
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Crear token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware para validar token JWT
function validateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token no válido' });
  }
}

// Ruta protegida
app.get('/protected', validateToken, (req, res) => {
  res.json({ message: 'Ruta protegida alcanzada', user: req.user });
});

// ...

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});