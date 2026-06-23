export const validateNotification = (req, res, next) => {
  const { type, title, message } = req.body;
  const allowedTypes = ['Placements', 'Results', 'Events'];

  if (!type || !title || !message) {
    return res.status(400).json({ error: 'Type, title, and message are required' });
  }

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid notification type' });
  }

  next();
};