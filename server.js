const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const { insertDocument, getDocumentById } = require('./db');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(`Received file: ${req.file.originalname} (${req.file.size} bytes)`);

  const documentId = crypto.randomUUID();
  const owner = req.body.owner || 'anonymous';
  const timestamp = new Date().toISOString();

  insertDocument({
    documentId,
    cid: null, // placeholder until IPFS integration in Phase 3
    owner,
    filename: req.file.originalname,
    timestamp,
  });

  res.json({ documentId, cid: null });
});

app.get('/document/:id', (req, res) => {
  const document = getDocumentById(req.params.id);

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  res.json(document);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
