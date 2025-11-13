import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const { PORT } = env;

app.listen(PORT, () => {
  logger.info(`🚀 API server running on port ${PORT}`);
});

