import express from 'express';
import { config } from './config/apiConfig.js';
import { getSchedulerResults } from './controllers/schedulerController.js';

const app = express();

app.use(express.json());

app.get('/api/scheduler/build', getSchedulerResults);

app.listen(config.port, () => {
  console.log(`Scheduler microservice execution ongoing on port ${config.port}`);
});