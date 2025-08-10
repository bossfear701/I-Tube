const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'I Tube Backend Running' });
});

app.post('/api/uploads/request', (req, res) => {
  res.json({
    preSignedUrl: 'https://example.com/upload',
    uploadId: 'mock123',
    storageKey: 'videos/mock.mp4'
  });
});

app.listen(4000, () => console.log('Mock API running on port 4000'));
