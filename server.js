// Carrega variáveis de ambiente
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const recargaRoutes = require('./routes/recargaRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configurar rotas
app.use('/users', userRoutes);
app.use('/recargas', recargaRoutes);

// Sincroniza o banco de dados
sequelize.sync({ force: false }).then(() => console.log('Banco sincronizado!'));

// Inicia o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));