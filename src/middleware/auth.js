const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret'; // Cambia esto por una clave secreta más segura

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Función para generar un token JWT
function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
}

module.exports = { authenticateToken, generateToken };