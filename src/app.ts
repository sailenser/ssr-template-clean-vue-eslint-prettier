// Этот файл и его зависимости являются общими для сервера и клиента
import { createApp } from 'vue';
import App from './App.vue';

export function initApp() {
  const app = createApp(App);

  /*
   * http, api, pinia, store, router
   */

  return { app };
}
