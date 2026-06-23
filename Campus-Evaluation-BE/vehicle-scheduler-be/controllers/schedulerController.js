import { buildSchedules } from '../services/schedulerService.js';

export const getSchedulerResults = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    const results = await buildSchedules(token);
    
    return res.status(200).json(results);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || 'Internal Server Error'
    });
  }
};