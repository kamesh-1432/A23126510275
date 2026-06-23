import express from 'express';
import dotenv from 'dotenv';
import { postNotification, getPriorityInbox } from './controllers/notificationController.js';
import { validateNotification } from './middleware/validation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post('/api/notifications', validateNotification, postNotification);
app.get('/api/notifications/priority', getPriorityInbox);

app.listen(PORT, () => {
  console.log(`Campus microservice active on port ${PORT}`);
});