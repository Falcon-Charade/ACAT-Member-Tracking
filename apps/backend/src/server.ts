import { buildApp } from './app.js';

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 3001);

async function start(): Promise<void> {
  const app = buildApp();

  try {
    await app.listen({
      host: HOST,
      port: PORT
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
