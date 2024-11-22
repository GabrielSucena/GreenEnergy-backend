const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, senha, preferenciaTipoRecarga, preferenciaHorario } = req.body;

  try {
    // Verifica se o username já está em uso
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username já está em uso.' });
    }

    // Cria o usuário
    const user = await User.create({ username, senha, preferenciaTipoRecarga, preferenciaHorario });
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário.', details: error });
  }
};

exports.login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    // Procura o usuário pelo username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha inválida.' });

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Retorna o username e o token
    res.json({ 
      message: 'Login bem-sucedido!', 
      id: user.id,
      username: user.username,
      token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.', details: error });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.updatePreferences = async (req, res) => {
  const { id } = req.params;
  const { preferenciaTipoRecarga, preferenciaHorario } = req.body;

  await User.update({ preferenciaTipoRecarga, preferenciaHorario }, { where: { id } });
  res.send(`Usuário ${id} atualizado.`);
};