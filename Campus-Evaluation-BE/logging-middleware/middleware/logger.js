export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    console.log(`[${timestamp}] ${method} ${url} - Status: ${statusCode} (${duration}ms)`);
  });

  next();
};