const Recarga = require('../models/recarga');

exports.getRecargas = async (req, res) => {
  const { idUser } = req.params;
  const recargas = await Recarga.findAll({ where: { idUser } });
  res.json(recargas);
};

exports.createRecarga = async (req, res) => {
  const { horaInicio, nomeCarro, tipoRecarga, idUser } = req.body;
  const dataInicio = new Date();

  const recarga = await Recarga.create({ horaInicio, nomeCarro, tipoRecarga, idUser, dataInicio });
  res.json(recarga);
};