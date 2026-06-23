import axios from 'axios';
import { config } from '../config/apiConfig.js';
import { optimizeMaintenance } from './optimizationEngine.js';

export const buildSchedules = async (authToken) => {
  const cleanToken = authToken.replace(/^Bearer\s+/i, '').trim();
  const headers = { 
    'Authorization': `Bearer ${cleanToken}`,
    'Accept': 'application/json'
  };

  const depotsResponse = await axios.get(`${config.baseUrl}/depots`, { headers });
  const depots = depotsResponse.data.depots;

  const vehiclesResponse = await axios.get(`${config.baseUrl}/vehicles`, { headers });
  const tasks = vehiclesResponse.data.vehicles;

  const schedules = [];

  for (const depot of depots) {
    const optimizedSchedule = optimizeMaintenance(depot.ID, depot.MechanicHours, tasks);
    schedules.push(optimizedSchedule);
  }

  return schedules;
};