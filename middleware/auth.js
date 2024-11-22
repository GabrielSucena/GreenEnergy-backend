const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my_secret_key'

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Decodifica o token e anexa ao objeto req
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};