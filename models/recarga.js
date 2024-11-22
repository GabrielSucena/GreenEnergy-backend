const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Recarga = sequelize.define('Recarga', {
  idRecarga: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  horaInicio: { type: DataTypes.INTEGER, allowNull: false },
  nomeCarro: { type: DataTypes.STRING, allowNull: false },
  tipoRecarga: { type: DataTypes.STRING, allowNull: false },
  dataInicio: { type: DataTypes.DATE, allowNull: false },
});

Recarga.belongsTo(User, { foreignKey: 'idUser' });

module.exports = Recarga;