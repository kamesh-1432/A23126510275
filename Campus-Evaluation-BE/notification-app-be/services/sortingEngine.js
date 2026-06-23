export const prioritizeNotifications = (notifications, limit) => {
  const weights = {
    'Placements': 3,
    'Results': 2,
    'Events': 1
  };

  return notifications
    .map(notification => {
      const typeWeight = weights[notification.type] || 0;
      const ageInSeconds = (Date.now() - new Date(notification.createdAt).getTime()) / 1000;
      const score = typeWeight - (ageInSeconds * 0.001);
      return { ...notification, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};