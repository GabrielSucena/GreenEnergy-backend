const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garante que usernames sejam únicos
  },
  senha: { type: DataTypes.STRING, allowNull: false },
  preferenciaTipoRecarga: { type: DataTypes.STRING, defaultValue: 1 },
  preferenciaHorario: { type: DataTypes.INTEGER, defaultValue: 13 },
});

// Antes de salvar, hashear a senha
User.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

module.exports = User;