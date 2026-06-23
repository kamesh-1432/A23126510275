export const broadcastNotificationBatch = async (notificationData) => {
  const totalSubscribers = 50000;
  const batchSize = 5000;
  
  for (let i = 0; i < totalSubscribers; i += batchSize) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return true;
};