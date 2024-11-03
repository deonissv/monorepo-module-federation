import fs from 'node:fs/promises';
import express from 'express';
import { render } from './render';

// Constants
const PORT = 5173;

// Cached production assets
const template = await fs.readFile(`./dist/client/index.html`, 'utf-8');

const app = express();
app.use('/static', express.static('./dist/client'));

// Serve HTML
app.get('/', async (req, res) => {
  try {
    const rendered = await render();

    const html = template.replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    console.log((e as Error).stack);
    res.status(500).end((e as Error).stack);
  }
});

// Start http server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
