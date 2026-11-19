//этот фпйл не будет делать ничего кроме монтировки приложения на клиенте
import { initApp } from './app';
// import './styles/index.scss';

const { app } = initApp();

app.mount('#app');
