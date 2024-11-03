import App from './app/App.vue';
import './styles.css';
import { createSSRApp } from 'vue';

export function createApp() {
  const app = createSSRApp(App);
  return { app };
}
