const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB = path.join(__dirname, 'videos.json');
function readDB(){ try{ return JSON.parse(fs.readFileSync(DB)); }catch(e){ return []; } }
function writeDB(data){ fs.writeFileSync(DB, JSON.stringify(data, null, 2)); }

app.get('/', (req, res) => res.json({ message: 'I Tube backend (Render) — running' }));

app.post('/api/videos', (req, res) => {
  const { title, storageUrl } = req.body || {};
  if(!title || !storageUrl) return res.status(400).json({ error: 'title and storageUrl required' });
  const videos = readDB();
  const id = Date.now().toString();
  const entry = { id, title, storageUrl, createdAt: new Date().toISOString() };
  videos.push(entry);
  writeDB(videos);
  res.json(entry);
});

app.get('/api/videos', (req, res) => {
  res.json(readDB());
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on', port));
