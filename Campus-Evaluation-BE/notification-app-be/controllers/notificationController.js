import crypto from 'crypto';
import { createNotificationRecord, fetchUnreadNotifications } from '../models/notificationModel.js';
import { prioritizeNotifications } from '../services/sortingEngine.js';
import { broadcastNotificationBatch } from '../services/streamService.js';

export const postNotification = async (req, res) => {
  try {
    const { type, title, message } = req.body;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await createNotificationRecord(id, type, title, message, createdAt);
    
    broadcastNotificationBatch({ id, type, title, message });

    return res.status(201).json({ success: true, notificationId: id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPriorityInbox = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const unread = await fetchUnreadNotifications();
    const sorted = prioritizeNotifications(unread, limit);
    return res.status(200).json(sorted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};