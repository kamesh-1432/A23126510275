export const optimizeMaintenance = (depotId, maxHours, tasks) => {
  const n = tasks.length;
  const dp = Array(n + 1).fill(null).map(() => Array(maxHours + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const task = tasks[i - 1];
    for (let w = 0; w <= maxHours; w++) {
      if (task.Duration <= w) {
        dp[i][w] = Math.max(task.Impact + dp[i - 1][w - task.Duration], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  const selectedTaskIds = [];
  let w = maxHours;
  let totalDuration = 0;

  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      const task = tasks[i - 1];
      selectedTaskIds.push(task.TaskID);
      w -= task.Duration;
      totalDuration += task.Duration;
    }
  }

  return {
    depotId,
    totalDuration,
    totalImpact: dp[n][maxHours],
    selectedTaskIds
  };
};