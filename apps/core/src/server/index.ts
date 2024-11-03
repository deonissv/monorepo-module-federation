import fs from 'node:fs/promises';
import express from 'express';
import { render } from './render';

const PORT = 5173;
const template = await fs.readFile(`./dist/client/index.html`, 'utf-8');

const getTitles = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const titles = await response.json();
  return titles.map((title: any) => title.title);
};

const app = express();
app.use('/static', express.static('./dist/client'));

app.get('/', async (req, res) => {
  try {
    const titles = await getTitles();
    const ctx = {
      titles: titles.slice(0, 4),
    };

    const rendered = await render(ctx);

    const html = template
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(`<!--store-data-->`, `<script>window.__INITIAL_DATA__ = ${JSON.stringify(ctx)}</script>`);

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    console.log((e as Error).stack);
    res.status(500).end((e as Error).stack);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
