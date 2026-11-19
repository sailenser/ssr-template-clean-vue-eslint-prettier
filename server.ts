import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const port = 5173;
const baseUrl = '/';

async function createExpressServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: baseUrl,
  });

  app.use(vite.middlewares);

  app.use('*all', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(import.meta.dirname, 'index.html'),
        'utf-8'
      );

      template = await vite.transformIndexHtml(url, template);

      const { initServerApp } = await vite.ssrLoadModule('/src/entry-server.ts');

      const appHtml = await initServerApp(url);

      const html = template.replace(`<!--ssr-outlet-->`, () => appHtml.html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  });
}

createExpressServer().catch(err => {
  console.error('Ошибка запуска сервера:', err);
  process.exit(1);
});
