import { renderToString } from 'vue/server-renderer';
import { createApp } from '../bootstrap';

export async function render(ctx = {}) {
  const { app } = createApp();

  const html = await renderToString(app, ctx);

  return { html };
}
