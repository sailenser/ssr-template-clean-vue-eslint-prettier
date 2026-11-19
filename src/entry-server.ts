import { renderToString } from 'vue/server-renderer';
import { initApp } from './app';

// Наполнение кэша, роутинг серверный
export async function initServerApp() {
  const { app } = initApp();

  //SSRContext опционально
  const context = {};
  const html = await renderToString(app, context);
  return { html };
}
