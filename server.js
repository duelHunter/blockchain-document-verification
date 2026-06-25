const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const { insertDocument, getDocumentById } = require('./db');
const { addToIpfs, getFromIpfs } = require('./ipfs');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    console.error('[upload] failed: no file in request');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(`[upload] received file: ${req.file.originalname} (${req.file.size} bytes)`);

  try {
    const cid = await addToIpfs(req.file.buffer);
    console.log(`[upload] added to IPFS, cid=${cid}`);

    const documentId = crypto.randomUUID();
    const owner = req.body.owner || 'anonymous';
    const timestamp = new Date().toISOString();

    insertDocument({
      documentId,
      cid,
      owner,
      filename: req.file.originalname,
      timestamp,
    });

    console.log(`[upload] success: documentId=${documentId} cid=${cid}`);
    res.json({ documentId, cid });
  } catch (err) {
    console.error(`[upload] failed: ${err.message}`);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/document/:id', (req, res) => {
  const document = getDocumentById(req.params.id);

  if (!document) {
    console.error(`[document] not found: ${req.params.id}`);
    return res.status(404).json({ error: 'Document not found' });
  }

  console.log(`[document] success: ${req.params.id}`);
  res.json(document);
});

app.get('/document/:id/file', async (req, res) => {
  const document = getDocumentById(req.params.id);

  if (!document || !document.cid) {
    console.error(`[document/file] not found: ${req.params.id}`);
    return res.status(404).json({ error: 'Document not found' });
  }

  try {
    const fileBuffer = await getFromIpfs(document.cid);
    console.log(`[document/file] success: ${req.params.id} cid=${document.cid}`);
    res.send(fileBuffer);
  } catch (err) {
    console.error(`[document/file] failed: ${req.params.id} cid=${document.cid} - ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch file from IPFS' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
