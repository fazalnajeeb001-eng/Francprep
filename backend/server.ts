import app from './src/app';
import { connectDatabase } from './src/config/database';
import { env } from './src/config/env';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start Express server
    app.listen(env.port, () => {
      console.log(`
╔══════════════════════════════════════════╗
║         FrancPrep API Server             ║
║──────────────────────────────────────────║
║  Status:   Running                        ║
║  Port:     ${String(env.port).padEnd(33)}║
║  Env:      ${env.nodeEnv.padEnd(33)}║
║  Frontend: ${env.frontendUrl.padEnd(33)}║
╚══════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();