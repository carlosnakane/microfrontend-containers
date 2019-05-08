import express from 'express';
import cors from 'cors';
import services from '../services/services.service';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.API_INTERNAL_PORT;

const insertOrUpdate = (req, res) => {
  const response = services.publish(req.body);
  res.send(response);
}

app.get('/', (req, res) => {
  res.send(JSON.stringify(services.list()));
});

app.post('/', insertOrUpdate);

app.put('/', insertOrUpdate);

app.delete('/', (req, res) => {
  const response = services.unpublish(req.body.name);
  res.send(response);
});

app.listen(PORT, () =>
  console.log(`Running on port ${PORT} (internal)`),
);