import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();
app.use(express.json());
const cors = require('cors')

const PORT = 3001;

app.use(cors())

app.use(express.static('build'));

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong2');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});