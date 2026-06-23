import express from 'express';
import { requestLogger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Logging middleware operating successfully' });
});

app.listen(PORT, () => {
  console.log(`Logging microservice running on port ${PORT}`);
});