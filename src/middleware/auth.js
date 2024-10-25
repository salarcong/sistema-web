const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

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

// Middleware para verificar el rol de administrador
function verifyAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
    }
    next();
  });
}

// Función para generar un token JWT
function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
}

module.exports = { authenticateToken, verifyAdmin, generateToken };



