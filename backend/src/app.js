const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/banheiroRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
