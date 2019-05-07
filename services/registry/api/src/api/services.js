import express from 'express';
import cors from 'cors';
import services from '../services/services.service';

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(process.env.PORT, () =>
  console.log(`Registry running on port ${process.env.API_INTERNAL_PORT}!`),
);