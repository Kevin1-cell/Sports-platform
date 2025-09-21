const express = require('express');
const cors = require('cors');
const tournamentRoutes = require('./routes/tournamentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', tournamentRoutes);

app.listen(3001, () => console.log('Microservicio de torneos en http://localhost:3001'));
